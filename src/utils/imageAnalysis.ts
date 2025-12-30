import * as exifr from "exifr";

/* ---------------------------------------
   Helpers
--------------------------------------- */
function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}

/* ---------------------------------------
   1. EXIF / Metadata Analysis
--------------------------------------- */
export async function analyzeExif(file: File) {
    let score = 0;
    const reasons: string[] = [];

    try {
        // Parse metadata
        const exif: any = await exifr.parse(file);

        if (!exif) {
            score += 30;
            reasons.push("No EXIF metadata found (common in generated images)");
        } else {
            if (!exif.Make || !exif.Model) {
                score += 20;
                reasons.push("Missing camera manufacturer or model info");
            }

            if (!exif.DateTimeOriginal) {
                score += 10;
                reasons.push("Original capture timestamp missing");
            }

            if (exif.Software) {
                const software = exif.Software.toLowerCase();
                if (
                    software.includes("stable diffusion") ||
                    software.includes("midjourney") ||
                    software.includes("dall") ||
                    software.includes("generated") ||
                    software.includes("adobe firefly")
                ) {
                    score += 50;
                    reasons.push(`Generative software signature detected: ${exif.Software}`);
                } else if (software.includes("photoshop") || software.includes("gimp")) {
                    score += 10;
                    reasons.push(`Edited with external software: ${exif.Software}`);
                }
            }
        }
    } catch (e) {
        score += 10;
        reasons.push("Metadata structure is unreadable");
    }

    return { score, reasons };
}

/* ---------------------------------------
   2. Pixel / Noise Heuristic Analysis
--------------------------------------- */
export async function analyzePixels(file: File) {
    const img = await loadImage(file);

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    // Get pixel data
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = data.length / 4;

    let mean = 0;

    // Calculate Mean Brightness
    for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        mean += brightness;
    }
    mean /= pixels;

    // Calculate Variance (Noise Level)
    let variance = 0;
    for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        variance += Math.pow(brightness - mean, 2);
    }
    variance /= pixels;

    let score = 0;
    const reasons: string[] = [];

    // AI images are often "too smooth" (low variance) or have specific noise patterns
    if (variance < 350) {
        score += 30;
        reasons.push("Unnaturally smooth pixel distribution");
    } else if (variance < 500) {
        score += 15;
        reasons.push("Lower than average image noise levels");
    }

    // Resolution vs Noise check
    if (img.width * img.height > 2_000_000 && variance < 400) {
        score += 15;
        reasons.push("High resolution with inconsistent texture detail");
    }

    return { score, reasons };
}

/* ---------------------------------------
   3. Final Combined Analysis
--------------------------------------- */
export async function performDeepfakeAnalysis(file: File) {
    const exif = await analyzeExif(file);
    const pixel = await analyzePixels(file);

    // Cap score at 100
    const totalScore = Math.min(exif.score + pixel.score, 100);

    let riskLevel: "low" | "medium" | "high" = "low";
    if (totalScore > 65) riskLevel = "high";
    else if (totalScore > 35) riskLevel = "medium";

    const allReasons = [...exif.reasons, ...pixel.reasons];

    // Fallback if no specific reasons found but score is low
    if (allReasons.length === 0) {
        allReasons.push("No significant anomalies detected in metadata or pixel structure.");
    }

    return {
        riskScore: totalScore,
        riskLevel,
        reasons: allReasons,
    };
}
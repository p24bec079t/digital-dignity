import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/landing/Footer";
import {
  ArrowLeft, Upload, AlertTriangle, CheckCircle, XCircle, Info, FileImage,
  Shield, ChevronRight, Scan, Eye, Fingerprint, Sparkles, RefreshCw
} from "lucide-react";
import { Helmet } from "react-helmet-async";
// IMPORT THE ANALYSIS LOGIC
import { performDeepfakeAnalysis } from "@/utils/imageAnalysis";

type RiskLevel = "low" | "medium" | "high" | null;

interface AnalysisResult {
  riskLevel: RiskLevel;
  indicators: string[];
  recommendation: string;
}

const DeepfakeCheck = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    setScanProgress(0);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      handleFileSelect(droppedFile);
    }
  }, [handleFileSelect]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const analyzeImage = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setScanProgress(0);

    // 1. Start the visual progress bar (UX)
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          return 90; // Hold at 90% until logic finishes
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    try {
      // 2. Run the REAL analysis logic
      // We add a minimum delay of 2 seconds so the user feels the "work" happening
      const [analysisResult] = await Promise.all([
        performDeepfakeAnalysis(file),
        new Promise(resolve => setTimeout(resolve, 2000))
      ]);

      clearInterval(progressInterval);
      setScanProgress(100);

      // 3. Map the result to your UI text
      const recommendations: Record<string, string> = {
        low: "While this scan shows low risk indicators, no tool can guarantee authenticity. If you have concerns, proceed with caution and follow the preservation steps below.",
        medium: "This content shows some indicators that warrant attention (such as missing metadata or unusual noise levels). This is not confirmation of manipulation, but we recommend treating it with caution.",
        high: "This content shows patterns commonly associated with AI-generated or manipulated media (such as generative software signatures or unnatural smoothness). We strongly recommend treating this as potentially fake."
      };

      setResult({
        riskLevel: analysisResult.riskLevel,
        indicators: analysisResult.reasons,
        recommendation: recommendations[analysisResult.riskLevel]
      });

    } catch (error) {
      console.error("Analysis failed", error);
      // Fallback error state
      setResult({
        riskLevel: "medium",
        indicators: ["Analysis process interrupted", "Please try another file"],
        recommendation: "We couldn't complete the scan perfectly. Please try again."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskConfig = (level: RiskLevel) => {
    switch (level) {
      case "low":
        return {
          icon: CheckCircle,
          color: "text-success",
          bg: "bg-success/10",
          border: "border-success/30",
          gradient: "from-success/20 to-success/5",
          label: "Low Risk",
          ring: "ring-success/20"
        };
      case "medium":
        return {
          icon: AlertTriangle,
          color: "text-warning",
          bg: "bg-warning/10",
          border: "border-warning/30",
          gradient: "from-warning/20 to-warning/5",
          label: "Medium Risk",
          ring: "ring-warning/20"
        };
      case "high":
        return {
          icon: XCircle,
          color: "text-destructive",
          bg: "bg-destructive/10",
          border: "border-destructive/30",
          gradient: "from-destructive/20 to-destructive/5",
          label: "High Risk",
          ring: "ring-destructive/20"
        };
      default:
        return null;
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setScanProgress(0);
  };

  return (
      <>
        <Helmet>
          <title>Deepfake Risk Check - Digital Dignity Toolkit</title>
          <meta name="description" content="Upload an image to check for signs of AI generation or manipulation. This tool provides risk indicators to support your decision-making." />
        </Helmet>

        <div className="min-h-screen bg-background flex flex-col">
          <Header />

          <main className="flex-1 pt-24 pb-16">
            <div className="container max-w-4xl">
              {/* Back button */}
              <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="mb-8 -ml-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {/* Hero Header */}
              <div className="relative rounded-[2rem] overflow-hidden mb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent" />
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                  backgroundSize: '32px 32px'
                }} />

                <div className="relative p-8 sm:p-12 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-accent/20 to-primary/20 mb-6 animate-pulse">
                    <Scan className="w-10 h-10 text-accent" />
                  </div>

                  <h1 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-4">
                    Deepfake <span className="text-gradient">Risk Check</span>
                  </h1>

                  <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                    Upload an image to analyze for signs of AI generation or manipulation.
                    Get risk indicators to help inform your next steps.
                  </p>
                </div>
              </div>

              {/* Important disclaimer */}
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-border/50 mb-10 fade-in-up">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Info className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Important to understand</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    This tool provides <strong className="text-foreground">risk indicators, not verdicts</strong>.
                    No AI can definitively detect all deepfakes. Use this as one part of your decision-making process.
                  </p>
                </div>
              </div>

              {/* Main content area */}
              <div className="grid lg:grid-cols-5 gap-8">
                {/* Upload/Preview section */}
                <div className="lg:col-span-3">
                  {!result ? (
                      <div className="rounded-3xl bg-card border border-border/50 shadow-card overflow-hidden fade-in-up">
                        {!preview ? (
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onClick={() => document.getElementById('file-input')?.click()}
                                className="relative p-12 cursor-pointer group"
                            >
                              <div className="absolute inset-4 border-2 border-dashed border-border rounded-2xl group-hover:border-primary/50 transition-colors" />

                              <div className="relative text-center py-8">
                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                  <Upload className="w-10 h-10 text-accent" />
                                </div>

                                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                                  Drop your image here
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                  or click to browse files
                                </p>
                                <p className="text-sm text-muted-foreground/70">
                                  Supports JPG, PNG, WebP • Max 10MB
                                </p>
                              </div>

                              <input
                                  id="file-input"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                              />
                            </div>
                        ) : (
                            <div className="p-6 space-y-6">
                              {/* Image preview */}
                              <div className="relative rounded-2xl overflow-hidden bg-secondary/50">
                                <div className="aspect-video relative">
                                  <img
                                      src={preview}
                                      alt="Preview"
                                      className="w-full h-full object-contain"
                                  />

                                  {/* Scanning overlay */}
                                  {isAnalyzing && (
                                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
                                        <div className="relative w-24 h-24 mb-6">
                                          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                                          <div
                                              className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"
                                              style={{ animationDuration: '1s' }}
                                          />
                                          <div className="absolute inset-4 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Eye className="w-8 h-8 text-primary animate-pulse" />
                                          </div>
                                        </div>

                                        <div className="text-center">
                                          <p className="font-semibold text-foreground mb-2">Analyzing image...</p>
                                          <div className="w-48 h-2 bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out rounded-full"
                                                style={{ width: `${scanProgress}%` }}
                                            />
                                          </div>
                                          <p className="text-xs text-muted-foreground mt-2">
                                            Checking metadata, patterns & signatures
                                          </p>
                                        </div>
                                      </div>
                                  )}
                                </div>
                              </div>

                              {/* File info */}
                              <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/50">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <FileImage className="w-5 h-5 text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                                      {file?.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {file && (file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={reset} disabled={isAnalyzing}>
                                  Remove
                                </Button>
                              </div>

                              {/* Analyze button */}
                              <Button
                                  variant="hero"
                                  size="xl"
                                  onClick={analyzeImage}
                                  disabled={isAnalyzing}
                                  className="w-full"
                              >
                                {isAnalyzing ? (
                                    <>
                                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                      Analyzing...
                                    </>
                                ) : (
                                    <>
                                      <Scan className="w-5 h-5 mr-2" />
                                      Analyze Image
                                    </>
                                )}
                              </Button>
                            </div>
                        )}
                      </div>
                  ) : (
                      /* Results */
                      <div className="space-y-6 fade-in-up">
                        {(() => {
                          const config = getRiskConfig(result.riskLevel);
                          if (!config) return null;
                          const Icon = config.icon;

                          return (
                              <div className={`relative rounded-3xl overflow-hidden border-2 ${config.border} shadow-card`}>
                                <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`} />

                                <div className="relative p-8">
                                  {/* Risk badge */}
                                  <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-16 h-16 rounded-2xl ${config.bg} flex items-center justify-center ring-4 ${config.ring}`}>
                                      <Icon className={`w-8 h-8 ${config.color}`} />
                                    </div>
                                    <div>
                                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Risk Assessment</span>
                                      <h2 className={`text-3xl font-display font-bold ${config.color}`}>
                                        {config.label}
                                      </h2>
                                    </div>
                                  </div>

                                  {/* Indicators */}
                                  <div className="space-y-3 mb-6">
                                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Detected Indicators</h3>
                                    {result.indicators.length > 0 ? (
                                        result.indicators.map((indicator, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 p-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 fade-in-up"
                                                style={{ animationDelay: `${0.1 * index}s` }}
                                            >
                                              <div className={`w-2 h-2 rounded-full ${config.color.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
                                              <span className="text-foreground">{indicator}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-3 text-sm text-muted-foreground italic">No specific anomalies detected</div>
                                    )}
                                  </div>

                                  {/* Recommendation */}
                                  <div className="p-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/30">
                                    <p className="text-muted-foreground leading-relaxed">
                                      {result.recommendation}
                                    </p>
                                  </div>
                                </div>
                              </div>
                          );
                        })()}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                              variant="hero"
                              size="lg"
                              onClick={() => navigate('/guide/deepfake')}
                              className="flex-1"
                          >
                            Follow Response Guide
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                          <Button variant="calm" size="lg" onClick={reset}>
                            Check Another
                          </Button>
                        </div>
                      </div>
                  )}
                </div>

                {/* Sidebar info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="rounded-3xl bg-card border border-border/50 shadow-card p-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Fingerprint className="w-5 h-5 text-primary" />
                      What we check
                    </h3>
                    <ul className="space-y-3">
                      {[
                        { label: "EXIF Metadata", desc: "Camera info, timestamps, editing history" },
                        { label: "Pixel Variance", desc: "Unnatural smoothness common in AI" },
                        { label: "Software Signatures", desc: "Traces of GenAI tools (DALL-E, etc)" },
                      ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-medium text-foreground">{item.label}</span>
                              <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                          </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl bg-gradient-to-br from-accent/5 to-primary/5 border border-border/50 p-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-accent" />
                      Your privacy
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Images are analyzed locally in your browser.
                      <strong className="text-foreground"> Nothing is uploaded to our servers</strong>.
                      When you close this page, all data is gone.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-card border border-border/50 shadow-card p-6 fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-warning" />
                      Limitations
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      No detection tool is 100% accurate. Sophisticated deepfakes may evade detection.
                      Always combine tool results with critical thinking and trusted advice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </>
  );
};

export default DeepfakeCheck;
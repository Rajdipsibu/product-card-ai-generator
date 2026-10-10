import { useState } from "react";

interface ProductDetails {
  title: string;
  description: string;
  keywords: string[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: ProductDetails;
}

function App() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setProduct(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/generate`,
        {
          method: "POST",
          headers: {
            "Contents-Type": "application/json",
          },
          body: JSON.stringify({
            productName: productName.trim(),
            category: category.trim(),
          }),
        },
      );

      const result = (await response.json()) as ApiResponse;
      if (!response.ok || !result.success || !result.data) {
        throw new Error(
          result.message || "Failed to generate product details.",
        );
      }
      setProduct(result.data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="min-h-screen bg-[#0b0c12] px-4 py-10 text-white sm:px-6 lg:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-violet-300">
            <span className="text-base">✦</span>
            AI-POWERED TOOL
          </span>

          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
            Product Card{" "}
            <span className="bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Generator
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Transform your product ideas into engaging titles, descriptions and
            keywords with the power of AI.
          </p>
        </header>

        {/* Main layout */}
        <div className="grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Form */}
          <section className="rounded-2xl border border-white/10 bg-[#14151e] p-5 shadow-xl shadow-black/10 sm:p-7">
            <div className="mb-7">
              <h2 className="text-xl font-semibold">Create your product</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Enter two details and let AI write your product content.
              </p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label
                  htmlFor="productName"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Product name
                </label>

                <input
                  id="productName"
                  type="text"
                  placeholder="e.g. Wireless Headphones"
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                  maxLength={100}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0d0e15] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/10"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Product category
                </label>

                <input
                  id="category"
                  type="text"
                  placeholder="e.g. Electronics"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  maxLength={60}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0d0e15] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/10"
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm leading-6 text-red-300"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-5 py-3.5 text-sm font-semibold shadow-lg shadow-violet-900/20 transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Generating details...
                  </>
                ) : (
                  <>
                    <span>✦</span>
                    Generate Details
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-start gap-3 rounded-xl bg-white/3 p-3.5">
              <span className="text-lg text-violet-300">✧</span>
              <p className="text-xs leading-5 text-slate-400">
                AI creates a title, a concise description and five relevant
                keywords based on your input.
              </p>
            </div>
          </section>

          {/* Preview */}
          <section
            aria-live="polite"
            className="min-w-0 rounded-2xl border border-white/10 bg-[#14151e] p-5 sm:p-7"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Live preview</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Your generated product card
                </p>
              </div>

              <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-400">
                {product ? "Generated" : "Preview"}
              </span>
            </div>

            {loading ? (
              <div className="flex min-h-97.5 flex-col items-center justify-center rounded-xl border border-dashed border-violet-400/20 bg-violet-400/3 px-6 text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 text-3xl text-violet-300">
                  <span className="animate-pulse">✦</span>
                </div>
                <h3 className="font-semibold">Creating something great...</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
                  AI is writing your product title, description and keywords.
                </p>
              </div>
            ) : product ? (
              <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#1b1c28]">
                {/* Decorative product visual */}
                <div className="relative flex min-h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-violet-950 via-[#382455] to-fuchsia-950">
                  <div className="absolute -left-16 -top-20 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" />
                  <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-fuchsia-400/20 blur-3xl" />

                  <span className="relative text-8xl text-violet-100 drop-shadow-[0_0_25px_rgba(196,181,253,0.3)]">
                    ✦
                  </span>

                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[10px] font-semibold tracking-widest text-violet-100">
                    AI GENERATED
                  </span>

                  <span className="absolute bottom-4 right-4 max-w-[70%] truncate rounded-full bg-black/25 px-3 py-1.5 text-xs text-white">
                    {category}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">
                    {category}
                  </span>

                  <h3 className="mt-3 break-words text-2xl font-bold leading-snug">
                    {product.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {product.description}
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <h4 className="mb-3 text-sm font-semibold">
                      Generated keywords
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {product.keywords.map((keyword, index) => (
                        <span
                          key={`${keyword}-${index}`}
                          className="rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-3 py-1.5 text-xs text-violet-200"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ) : (
              <div className="flex min-h-[390px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-6 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/[0.08] text-3xl text-violet-300">
                  ✧
                </div>

                <h3 className="font-semibold text-slate-200">
                  Your product card starts here
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
                  Enter a product name and category, then click Generate Details
                  to see the AI-generated result.
                </p>
              </div>
            )}
          </section>
        </div>

        <footer className="mt-10 text-center text-xs text-slate-500">
          Built with React, TypeScript, Tailwind CSS and Gemini AI
        </footer>
      </div>
    </main>
  );
}

export default App;

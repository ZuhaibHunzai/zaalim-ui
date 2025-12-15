// pages/premium-designs/index.tsx
import { PremiumDesignsLayout } from "./layout/DesignsLayout";

export default function PremiumDesignsHome() {
  return (
    <PremiumDesignsLayout>
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Premium Designs</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Ready-to-use component designs built with Zaalim UI. Select a category
          from the sidebar to explore designs.
        </p>

        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/20 p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-xl">🚀</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Get Started with Premium Designs
              </h2>
              <p className="text-sm text-muted-foreground">
                Copy-paste ready components for your projects
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium">1</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Browse Categories</h3>
                  <p className="text-sm text-muted-foreground">
                    Select a component category from the sidebar
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium">2</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Preview Designs</h3>
                  <p className="text-sm text-muted-foreground">
                    View interactive previews of each design
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium">3</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Copy Code</h3>
                  <p className="text-sm text-muted-foreground">
                    Click "Copy Code" to get the complete implementation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium">4</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Customize</h3>
                  <p className="text-sm text-muted-foreground">
                    Modify the code to fit your specific needs
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-5">
              <h3 className="font-semibold mb-3">Featured Design</h3>
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-2xl">💎</span>
                  </div>
                  <p className="text-sm font-medium">User Profile Card</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    From Cards category
                  </p>
                </div>
              </div>
              <a
                href="/premium-designs/cards"
                className="block w-full py-2 rounded-lg bg-primary text-primary-foreground text-center text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                View All Cards →
              </a>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">40+</div>
            <div className="text-sm text-muted-foreground">Designs</div>
          </div>
          <div className="border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">5</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
          <div className="border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">Responsive</div>
          </div>
          <div className="border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">∞</div>
            <div className="text-sm text-muted-foreground">Customizable</div>
          </div>
        </div>

        {/* Quick Access to Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <a
              href="/premium-designs/cards"
              className="group p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 mx-auto mb-2 flex items-center justify-center">
                <span className="text-lg">🃏</span>
              </div>
              <div className="font-medium">Cards</div>
              <div className="text-xs text-muted-foreground mt-1">
                12 designs
              </div>
            </a>

            <a
              href="/premium-designs/buttons"
              className="group p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 mx-auto mb-2 flex items-center justify-center">
                <span className="text-lg">🖱️</span>
              </div>
              <div className="font-medium">Buttons</div>
              <div className="text-xs text-muted-foreground mt-1">
                8 designs
              </div>
            </a>

            <a
              href="/premium-designs/inputs"
              className="group p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 mx-auto mb-2 flex items-center justify-center">
                <span className="text-lg">⌨️</span>
              </div>
              <div className="font-medium">Inputs</div>
              <div className="text-xs text-muted-foreground mt-1">
                6 designs
              </div>
            </a>

            <a
              href="/premium-designs/badges"
              className="group p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 mx-auto mb-2 flex items-center justify-center">
                <span className="text-lg">🏷️</span>
              </div>
              <div className="font-medium">Badges</div>
              <div className="text-xs text-muted-foreground mt-1">
                5 designs
              </div>
            </a>

            <a
              href="/premium-designs/avatars"
              className="group p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 mx-auto mb-2 flex items-center justify-center">
                <span className="text-lg">👤</span>
              </div>
              <div className="font-medium">Avatars</div>
              <div className="text-xs text-muted-foreground mt-1">
                4 designs
              </div>
            </a>
          </div>
        </div>
      </div>
    </PremiumDesignsLayout>
  );
}

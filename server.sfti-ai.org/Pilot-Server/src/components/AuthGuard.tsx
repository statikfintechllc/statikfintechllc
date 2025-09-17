import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { GitBranch, Robot, Lightning, Shield, SignIn, Star } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { authState, signIn } = useAuth();

  console.log('AuthGuard - Current auth state:', authState);

  if (authState.isAuthenticated) {
    console.log('AuthGuard - User is authenticated, showing app');
    return <>{children}</>;
  }

  console.log('AuthGuard - User not authenticated, showing login screen');

  const handleSignIn = async () => {
    await signIn();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-full">
              <Robot className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Pilot Server
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Multi-Model AI Chat Interface with GitHub Integration
          </p>
        </div>

        {/* Main Auth Card */}
        <Card className="border-2 border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="flex items-center justify-center gap-2">
              <GitBranch className="w-5 h-5" />
              Connect with GitHub
            </CardTitle>
            <CardDescription>
              Sign in with your GitHub account to access all AI models and features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/30 border">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-5 h-5 text-accent" />
                  <span className="font-medium">Multi-Model AI</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Access GPT-4o, Claude, Gemini, and more AI models
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/30 border">
                <div className="flex items-center gap-3 mb-2">
                  <Lightning className="w-5 h-5 text-accent" />
                  <span className="font-medium">Advanced Features</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Image uploads, file analysis, voice input
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/30 border">
                <div className="flex items-center gap-3 mb-2">
                  <GitBranch className="w-5 h-5 text-accent" />
                  <span className="font-medium">Repository Integration</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Browse and analyze your GitHub repositories
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/30 border">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="font-medium">Secure & Private</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your data stays secure with GitHub authentication
                </p>
              </div>
            </div>

            {/* Sign In Button */}
            <div className="flex flex-col items-center space-y-4">
              <Button 
                onClick={handleSignIn}
                disabled={authState.isLoading}
                size="lg"
                className="w-full max-w-sm h-12 text-base font-medium"
              >
                <SignIn className="w-5 h-5 mr-2" />
                {authState.isLoading ? 'Connecting...' : 'Continue with GitHub'}
              </Button>
              
              {authState.error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 w-full">
                  <p className="text-sm text-destructive text-center">{authState.error}</p>
                </div>
              )}
            </div>

            {/* Info Text */}
            <div className="text-center text-sm text-muted-foreground">
              <p>
                By continuing, you agree to use this service responsibly and in accordance with GitHub's terms.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Built with React, TypeScript, and GitHub Spark
          </p>
        </div>
      </div>
    </div>
  );
}
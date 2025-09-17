import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth, AVAILABLE_GITHUB_MODELS } from '@/hooks/use-auth';
import { Gear, SignIn, SignOut, Robot, GitBranch, User, Star, ArrowClockwise } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface SettingsDialogProps {
  trigger?: React.ReactNode;
  className?: string;
}

export function SettingsDialog({ trigger, className }: SettingsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { authState, availableModels, signIn, signOut, clearError, getUserRepos, fetchAvailableModels } = useAuth();
  const [repos, setRepos] = useState<any[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [refreshingModels, setRefreshingModels] = useState(false);

  const handleSignIn = async () => {
    const success = await signIn();
    if (success) {
      // Load repositories after successful sign in
      try {
        setLoadingRepos(true);
        const userRepos = await getUserRepos();
        setRepos(userRepos);
      } catch (error) {
        console.error('Error loading repositories:', error);
      } finally {
        setLoadingRepos(false);
      }
    }
  };

  const handleRefreshModels = async () => {
    setRefreshingModels(true);
    try {
      await fetchAvailableModels();
    } catch (error) {
      console.error('Error refreshing models:', error);
    } finally {
      setRefreshingModels(false);
    }
  };

  const handleSignOut = () => {
    signOut();
    setRepos([]);
    setIsOpen(false);
  };

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="sm"
      className={cn("h-8 w-8 p-0", className)}
      title="Settings"
    >
      <Gear className="w-4 h-4" />
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gear className="w-5 h-5" />
            Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* GitHub Authentication Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                GitHub Integration
              </CardTitle>
              <CardDescription>
                Connect your GitHub account to access AI models and repositories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {authState.isAuthenticated && authState.user ? (
                <div className="space-y-4">
                  {/* User Info */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <img 
                      src={authState.user.avatar_url} 
                      alt={authState.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{authState.user.name || authState.user.login}</div>
                      <div className="text-sm text-muted-foreground">@{authState.user.login}</div>
                      {authState.user.email && (
                        <div className="text-xs text-muted-foreground">{authState.user.email}</div>
                      )}
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Connected
                    </Badge>
                  </div>

                  {/* User Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-2 rounded-lg bg-muted/30">
                      <div className="font-semibold">{authState.user.public_repos}</div>
                      <div className="text-xs text-muted-foreground">Repos</div>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/30">
                      <div className="font-semibold">{authState.user.followers}</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/30">
                      <div className="font-semibold">{authState.user.following}</div>
                      <div className="text-xs text-muted-foreground">Following</div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleSignOut} 
                    variant="outline" 
                    className="w-full"
                  >
                    <SignOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="p-6 rounded-lg bg-muted/30 border-dashed border-2">
                    <User className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="font-medium mb-2">Connect GitHub Account</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Sign in to access AI models and your repositories
                    </p>
                    <Button 
                      onClick={handleSignIn}
                      disabled={authState.isLoading}
                      className="w-full"
                    >
                      <SignIn className="w-4 h-4 mr-2" />
                      {authState.isLoading ? 'Connecting...' : 'Connect GitHub'}
                    </Button>
                  </div>
                  
                  {authState.error && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <p className="text-sm text-destructive">{authState.error}</p>
                      <Button 
                        onClick={clearError} 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2 h-auto p-1 text-xs"
                      >
                        Dismiss
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Available Models Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Robot className="w-5 h-5" />
                    Available AI Models ({availableModels.length}/{AVAILABLE_GITHUB_MODELS.length})
                  </CardTitle>
                  <CardDescription>
                    {authState.isAuthenticated 
                      ? 'AI models available through your GitHub account'
                      : 'Sign in to access more AI models'
                    }
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefreshModels}
                  disabled={refreshingModels}
                  className="flex-shrink-0"
                >
                  <ArrowClockwise className={`w-4 h-4 ${refreshingModels ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {availableModels.length > 0 ? (
                  availableModels.map((model) => (
                    <div 
                      key={model.id} 
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{model.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {model.provider}
                          </Badge>
                          {authState.isAuthenticated && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              ✓ Available
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{model.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>{(model.context_length / 1000).toFixed(0)}k context</span>
                          {model.supports_vision && <span>• Vision</span>}
                          {model.supports_function_calling && <span>• Functions</span>}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 text-muted-foreground">
                    <Robot className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No models available. Please check your GitHub authentication.</p>
                  </div>
                )}
              </div>
              
              {!authState.isAuthenticated && availableModels.length < AVAILABLE_GITHUB_MODELS.length && (
                <div className="mt-4 p-3 rounded-lg bg-blue-50/50 border border-blue-200/50">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <Robot className="w-4 h-4" />
                    <span className="font-medium">Sign in to unlock {AVAILABLE_GITHUB_MODELS.length - availableModels.length} more models</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Access Claude, Llama, Gemini, and other advanced AI models through GitHub.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Repositories Section */}
          {authState.isAuthenticated && repos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  Your Repositories
                </CardTitle>
                <CardDescription>
                  Recent repositories from your GitHub account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {repos.map((repo) => (
                    <div 
                      key={repo.id} 
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{repo.name}</span>
                          {repo.language && (
                            <Badge variant="outline" className="text-xs">
                              {repo.language}
                            </Badge>
                          )}
                        </div>
                        {repo.description && (
                          <p className="text-xs text-muted-foreground mb-2">{repo.description}</p>
                        )}
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {repo.stargazers_count}
                          </span>
                          <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* App Information */}
          <Card>
            <CardHeader>
              <CardTitle>About Pilot Server</CardTitle>
              <CardDescription>
                AI Chat Interface with GitHub Integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Version:</span> 1.0.0
              </div>
              <div className="text-sm">
                <span className="font-medium">Features:</span> Multi-model AI, GitHub integration, file uploads, voice input
              </div>
              <div className="text-sm">
                <span className="font-medium">Support:</span> GitHub Issues and Discussions
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import { Loading } from '@/components/ui/loading';

export interface InputNewsProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onSubmit: () => void;
  label: string;
}

const InputNews = React.forwardRef<HTMLTextAreaElement, InputNewsProps>(({ className, onSubmit, label, ...props }, ref) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await onSubmit();
    setIsLoading(false);
  };

  return (
    <div className="bg-card shadow-md rounded-lg p-6 my-8">
      <div className="flex justify-between items-center">
        <div className="text-lg font-medium">{label}</div>
        <button onClick={toggleCollapse} className="focus:outline-none">
          <Lightbulb className={`transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {isLoading ? <Loading /> : !isCollapsed && (
        <div className="space-y-2 mt-4">
          <textarea
            className={cn(
              "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
            rows={4}
            style={{ resize: 'none', overflow: 'hidden' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = target.scrollHeight + 'px';
            }}
          />
          <Button
            type="button"
            onClick={handleSubmit}
            variant="outline"
            disabled={isLoading}
          >
            {label}
          </Button>
        </div>
      )}

    </div>
  );
});

InputNews.displayName = "InputNews";

export { InputNews };


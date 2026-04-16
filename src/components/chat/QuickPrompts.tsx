import { Button } from '@/components/ui/button';

interface QuickPromptsProps {
  onPromptSelect: (prompt: string) => void;
}

const quickPrompts = [
  "Help me study better",
  "Career advice",
  "I feel stressed",
  "Build my roadmap"
];

export default function QuickPrompts({ onPromptSelect }: QuickPromptsProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Quick suggestions:</p>
      <div className="flex flex-wrap gap-2">
        {quickPrompts.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            size="sm"
            onClick={() => onPromptSelect(prompt)}
            className="text-xs h-8 px-3 rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
}
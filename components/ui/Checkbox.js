import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Checkbox Component
 * Custom checkbox with proper accessibility
 */
const Checkbox = forwardRef(({ 
  className, 
  checked, 
  onCheckedChange,
  ...props 
}, ref) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-primary text-primary-foreground' : 'bg-background',
        className
      )}
      ref={ref}
      {...props}
    >
      {checked && (
        <Check className="h-3 w-3" />
      )}
    </button>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
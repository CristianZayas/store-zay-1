"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/use-products";

interface CategoryFilterProps {
  selected?: string;
  onSelect: (category?: string) => void;
  initialCategories?: string[];
}

export function CategoryFilter({
  selected,
  onSelect,
  initialCategories,
}: CategoryFilterProps) {
  const { data: categories, isLoading } = useCategories(initialCategories);

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={!selected ? "default" : "outline"}
        size="sm"
        className={`rounded-full ${!selected ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-primary"}`}
        onClick={() => onSelect(undefined)}
      >
        All
      </Button>
      {categories?.map((category) => (
        <Button
          key={category}
          variant={selected === category ? "default" : "outline"}
          size="sm"
          className={`rounded-full capitalize ${selected === category ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-primary"}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}

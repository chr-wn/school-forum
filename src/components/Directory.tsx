"use client";

import { Check, ChevronDown, Command } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { cn } from "@/lib/utils";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command";

export default function Directory() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("home");

  //   async function getCategoryData() {
  //     const session = await getAuthSession();

  //     const follows = await db.follow.findMany({
  //       where: {
  //         userId: session?.user.id,
  //       },
  //       include: {
  //         category: true,
  //       },
  //     });

  //     return follows.map((follow) => follow.category);
  //   }

  //   const categories = getCategoryData();
  const categories = [
    {
      value: "home",
      label: "Home",
    },
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {categories.find((category) => category.value === value)?.label}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className={`${categories.length > 5 && "h-[200px]"}`}>
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.label}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

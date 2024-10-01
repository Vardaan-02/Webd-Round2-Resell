"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InputProps {
  itemList:any,
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const ItemPicker: React.FC<InputProps> = ({itemList, value, setValue }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between bg-white dark:bg-zinc-900 h-10 w-full border-gray-100"
        >
          {value}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command className="bg-white dark:bg-zinc-900">
          <CommandInput placeholder="Search..." className="h-9 bg-white dark:bg-zinc-900" />
          <CommandList className="no-scrollbar bg-white dark:bg-zinc-900">
            <CommandEmpty className="bg-white dark:bg-zinc-900 flex justify-center items-center">
              No Item found.
            </CommandEmpty>
            <CommandGroup>
              {itemList.map((item: any) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {item}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === item ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ItemPicker;

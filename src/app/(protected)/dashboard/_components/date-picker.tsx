"use client";

import { addMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { parseAsIsoDate, useQueryState } from "nuqs";
import { useMemo, useState } from "react";
import type { DateRange, Matcher } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DateRangePickerProps = {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  isDisabled?: boolean;
  disabled?: Matcher | Matcher[];
  numberOfMonths?: number;
};

function DatePicker({
  value,
  onChange,
  placeholder = "Período",
  className,
  buttonClassName,
  isDisabled,
  disabled,
  numberOfMonths = 2,
}: DateRangePickerProps) {
  const [from, setFrom] = useQueryState(
    "from",
    parseAsIsoDate.withDefault(new Date()),
  );
  const [to, setTo] = useQueryState(
    "to",
    parseAsIsoDate.withDefault(addMonths(new Date(), 1)),
  );

  const [open, setOpen] = useState(false);
  const [isSelectingRange, setIsSelectingRange] = useState(false);
  const [internalRange, setInternalRange] = useState<DateRange | undefined>(
    value ?? { from, to },
  );

  const range = value ?? internalRange;

  // Função para formatar no padrão "20 ago 2025"
  const formatShortDate = (date: Date) =>
    format(date, "dd MMM yyyy", { locale: ptBR });

  const label = useMemo(() => {
    if (range?.from && range?.to) {
      return `${formatShortDate(range.from)} - ${formatShortDate(range.to)}`;
    }
    if (range?.from && !range?.to) {
      return `${formatShortDate(range.from)} - ...`;
    }
    return placeholder;
  }, [range, placeholder]);

  const handleSelect = (nextRange: DateRange | undefined) => {
    if (!onChange) {
      setInternalRange(nextRange);
    }
    onChange?.(nextRange);

    // Atualiza setFrom e setTo
    if (nextRange?.from) {
      setFrom(nextRange.from);
    }
    if (nextRange?.to) {
      setTo(nextRange.to);
    }

    const selectingFirstDate = nextRange?.from && !nextRange?.to;
    const sameDaySelection =
      nextRange?.from &&
      nextRange?.to &&
      nextRange.from.getTime() === nextRange.to.getTime();

    if (selectingFirstDate || sameDaySelection) {
      setIsSelectingRange(true);
      setOpen(true);
    } else if (nextRange?.from && nextRange?.to) {
      setIsSelectingRange(false);
      setOpen(false);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover
        modal
        open={open}
        onOpenChange={(next) => {
          if (!next && isSelectingRange) return;
          setOpen(next);
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !range?.from && "text-muted-foreground",
              buttonClassName,
            )}
            disabled={isDisabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
          onInteractOutside={(e) => {
            if (isSelectingRange) e.preventDefault();
          }}
        >
          <Calendar
            mode="range"
            selected={range}
            onSelect={handleSelect}
            numberOfMonths={numberOfMonths}
            locale={ptBR}
            disabled={disabled}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePicker;

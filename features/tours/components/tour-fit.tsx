import { CircleCheckIcon, CircleHelpIcon } from "lucide-react";
import { tourPage } from "@/content/pages/tour-page";
import { Inline } from "@/lib/content/inline";
import type { Tour } from "@/types/content";

/** "Is this trip for you?": who it suits and when to think twice (01-voice.md rule 2: say the hard part). */
export function TourFit({ fit }: { fit: NonNullable<Tour["fit"]> }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex flex-col gap-2 rounded-lg border bg-card p-5">
        <h3 className="flex items-center gap-2 font-semibold">
          <CircleCheckIcon aria-hidden className="size-5 text-success" />
          {tourPage.fit.goodFitIf}
        </h3>
        <p>
          <Inline text={fit.goodFitIf} />
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border bg-card p-5">
        <h3 className="flex items-center gap-2 font-semibold">
          <CircleHelpIcon aria-hidden className="size-5 text-warning" />
          {tourPage.fit.thinkTwiceIf}
        </h3>
        <p>
          <Inline text={fit.thinkTwiceIf} />
        </p>
      </div>
    </div>
  );
}

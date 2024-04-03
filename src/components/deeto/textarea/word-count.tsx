import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  value?: string;
  limit: number;
};

export default function TextareaWordCount({ value, limit }: Props) {
  const { t } = useTranslation();
  const wordCount = useMemo(() => value?.trim().split(/\s+/).length, [value]);

  if (wordCount ?? 0 >= limit) {
    return (
      <div
        className="flex items-center justify-between rounded-b-xl bg-secondary-green px-4 py-2
          text-2xl text-white"
      >
        {t("thats_perfect")}{" "}
        <div>
          <span className="text-lg">{wordCount}</span> 🔥
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-wrap items-center justify-between rounded-b-xl bg-secondary-rose px-4
        py-2 font-inter text-sm"
    >
      {t("text_area_word_tip", { count: limit })}
      <div className="text-lg font-bold">
        {wordCount} / {limit} <span className="text-xl">😥</span>{" "}
      </div>
    </div>
  );
}

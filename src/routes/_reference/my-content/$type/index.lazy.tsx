import { Link, Navigate, createLazyFileRoute } from "@tanstack/react-router";
import useMyContributionsQuery from "../-query";
import { useMemo } from "react";
import PageTitle from "@/components/deeto/text/page-title";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isExternal } from "./-utils";
import AdditionalInfoRow from "./-additional-info-row";

const contributionTabsSorted = [
  "Quote",
  "Review",
  "QuestionsAndAnswers",
  "CaseStudy",
  "VideoTestimonial",
  "g2Review",
];

const Content = () => {
  const { t } = useTranslation();
  const type = Route.useParams().type;
  const { data: fullData } = useMyContributionsQuery();

  const data = useMemo(
    () =>
      fullData
        .map((items) => items.contributions.find((item) => item.type === type))
        .unwrap(),
    [fullData],
  );

  if (!data || !fullData.ok) {
    return <Navigate to="/my-content" />;
  }

  const tabs = useMemo(() => {
    return (
      contributionTabsSorted
        .filter(
          (item) =>
            fullData.val.contributions &&
            fullData.val.contributions
              .concat(fullData.val.external)
              .find(
                (i) =>
                  i?.type &&
                  i?.type.toLowerCase() === item.toLowerCase() &&
                  (isExternal(i.type) ? i.url : true),
              ),
        )
        .map((i) => i) ?? []
    );
  }, [fullData.val.contributions]);

  return (
    <div className="flex flex-col gap-6">
      <PageTitle>
        <Button size="lg" className="px-2 py-1">
          <ArrowLeft className="size-10" />
        </Button>
        {t("content_details")}
      </PageTitle>
      <Tabs className="mt-4" defaultValue={type}>
        <TabsList>
          {tabs.map((type) => (
            <TabsTrigger value={type} key={type} asChild>
              <Link params={{ type: type }} replace={true}>
                {t(type.toLowerCase())}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
        {fullData.val.contributions.map((item) => {
          return (
            <TabsContent key={item.contributionId} value={item.type}>
              <AdditionalInfoRow item={item} />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export const Route = createLazyFileRoute("/_reference/my-content/$type/")({
  component: Content,
});


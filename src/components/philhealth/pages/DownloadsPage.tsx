"use client";

import * as React from "react";
import {
  Search,
  Download,
  FileText,
  FileSpreadsheet,
  FileType,
  Clock,
  TrendingUp,
  ChevronRight,
  Eye,
  Star,
  Calendar,
  X,
  Filter,
  ArrowDownToLine,
} from "lucide-react";
import { useNavigation, type PageKey } from "@/store/navigation-store";
import { PageHeader, Section, SectionHeading, Card } from "../blocks/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { downloads, downloadCategories, type DownloadItem } from "@/lib/philhealth-data";
import { cn } from "@/lib/utils";

const fileTypeIcons: Record<DownloadItem["fileType"], React.ElementType> = {
  PDF: FileText,
  Excel: FileSpreadsheet,
  Word: FileType,
};

const fileTypeColors: Record<DownloadItem["fileType"], string> = {
  PDF: "bg-red-50 text-red-600 border-red-200",
  Excel: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Word: "bg-blue-50 text-blue-700 border-blue-200",
};

export function DownloadsPage() {
  const { navigate } = useNavigation();
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [activeTab, setActiveTab] = React.useState<string>("all");
  const [preview, setPreview] = React.useState<DownloadItem | null>(null);

  const filtered = downloads.filter((d) => {
    if (activeCategory !== "all" && d.category !== activeCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const recent = [...downloads].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 6);
  const popular = [...downloads].sort((a, b) => b.downloads - a.downloads).slice(0, 6);

  const displayList = activeTab === "recent" ? recent : activeTab === "popular" ? popular : filtered;

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Home" }, { label: "Downloads" }]}
        eyebrow="Forms & Documents"
        title="All PhilHealth forms, in one place"
        description="Download official forms, circulars, annual reports, and benefit schedules. Smart search helps you find exactly what you need — fast."
        actions={
          <Button
            onClick={() => navigate("services")}
            className="bg-ph-green hover:bg-ph-green-dark text-white"
          >
            Start an online service
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        }
      />

      {/* Stats banner */}
      <div className="border-b border-border bg-white">
        <div className="container-ph-wide py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: downloads.length.toString(), label: "Total documents", icon: FileText },
            { value: downloadCategories.length.toString(), label: "Categories", icon: Filter },
            { value: "1.2M+", label: "Total downloads (2024)", icon: ArrowDownToLine },
            { value: "24/7", label: "Always available", icon: Clock },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ph-green-light text-ph-green-darker flex-shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Section className="!py-8">
        {/* Smart search */}
        <Card className="p-4 md:p-5 mb-6 sticky top-16 lg:top-18 z-30 bg-white/95 backdrop-blur shadow-sm">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, form code, or description..."
                className="pl-9 h-11"
                aria-label="Search downloads"
              />
            </div>
          </div>
          {/* Category chips */}
          <div className="flex gap-2 overflow-x-auto scrollbar-thin mt-3 pt-3 border-t">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                activeCategory === "all"
                  ? "bg-ph-green text-white"
                  : "bg-muted hover:bg-ph-green-light hover:text-ph-green-darker"
              )}
            >
              All categories
            </button>
            {downloadCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                  activeCategory === cat.id
                    ? "bg-ph-green text-white"
                    : "bg-muted hover:bg-ph-green-light hover:text-ph-green-darker"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              All ({filtered.length})
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              Recently Updated
            </TabsTrigger>
            <TabsTrigger value="popular" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
              Most Downloaded
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {activeTab === "all" && activeCategory === "all" && !search ? (
              <CategoryGroupedView downloads={filtered} onPreview={setPreview} />
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayList.map((item) => (
                  <DownloadCard key={item.id} item={item} onPreview={setPreview} />
                ))}
              </div>
            )}

            {displayList.length === 0 && (
              <Card className="p-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mx-auto mb-3">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold">No downloads found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try a different search or browse all categories.
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </Section>

      {/* Preview dialog */}
      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {preview && (() => {
                const Icon = fileTypeIcons[preview.fileType];
                return (
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg border",
                      fileTypeColors[preview.fileType]
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                );
              })()}
              <span>{preview?.title}</span>
            </DialogTitle>
            <DialogDescription>{preview?.description}</DialogDescription>
          </DialogHeader>
          {preview && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-muted/40 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">File Type</div>
                  <div className="text-sm font-semibold mt-0.5">{preview.fileType}</div>
                </div>
                <div className="rounded-lg bg-muted/40 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Size</div>
                  <div className="text-sm font-semibold mt-0.5">{preview.fileSize}</div>
                </div>
                <div className="rounded-lg bg-muted/40 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Updated</div>
                  <div className="text-sm font-semibold mt-0.5">{preview.updatedAt}</div>
                </div>
                <div className="rounded-lg bg-muted/40 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Downloads</div>
                  <div className="text-sm font-semibold mt-0.5">{preview.downloads.toLocaleString()}</div>
                </div>
              </div>

              {/* Mock preview */}
              <div className="rounded-lg border border-border bg-muted/30 aspect-[4/5] sm:aspect-[3/2] flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                  {(() => {
                    const Icon = fileTypeIcons[preview.fileType];
                    return (
                      <div
                        className={cn(
                          "inline-flex h-16 w-16 items-center justify-center rounded-2xl border mb-4",
                          fileTypeColors[preview.fileType]
                        )}
                      >
                        <Icon className="h-8 w-8" />
                      </div>
                    );
                  })()}
                  <div className="text-sm font-semibold text-foreground">{preview.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">Form preview not available in this demo</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-ph-green hover:bg-ph-green-dark text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download ({preview.fileSize})
                </Button>
                <Button variant="outline" onClick={() => setPreview(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CategoryGroupedView({
  downloads,
  onPreview,
}: {
  downloads: DownloadItem[];
  onPreview: (item: DownloadItem) => void;
}) {
  return (
    <div className="space-y-8">
      {downloadCategories.map((cat) => {
        const items = downloads.filter((d) => d.category === cat.id);
        if (items.length === 0) return null;
        return (
          <div key={cat.id}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-foreground">{cat.name}</h2>
              <Badge variant="outline" className="text-xs">
                {items.length} {items.length === 1 ? "file" : "files"}
              </Badge>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <DownloadCard key={item.id} item={item} onPreview={onPreview} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DownloadCard({
  item,
  onPreview,
}: {
  item: DownloadItem;
  onPreview: (item: DownloadItem) => void;
}) {
  const Icon = fileTypeIcons[item.fileType];

  return (
    <Card className="p-4 flex flex-col hover:shadow-md hover:border-ph-green/30 transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg border flex-shrink-0",
            fileTypeColors[item.fileType]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-[10px] py-0">
              {item.fileType}
            </Badge>
            <span className="text-[10px] text-muted-foreground">{item.fileSize}</span>
          </div>
        </div>
        {item.popular && (
          <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border border-amber-200 text-[10px]">
            <Star className="h-2.5 w-2.5 mr-1 fill-amber-500 text-amber-500" />
            Popular
          </Badge>
        )}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
        {item.description}
      </p>

      <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {item.updatedAt}
        </span>
        <span className="flex items-center gap-1">
          <Download className="h-3 w-3" />
          {item.downloads.toLocaleString()}
        </span>
      </div>

      <div className="mt-3 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPreview(item)}
          className="flex-1 h-8 text-xs"
        >
          <Eye className="h-3 w-3 mr-1.5" />
          Preview
        </Button>
        <Button
          size="sm"
          className="flex-1 h-8 text-xs bg-ph-green hover:bg-ph-green-dark text-white"
        >
          <Download className="h-3 w-3 mr-1.5" />
          Download
        </Button>
      </div>
    </Card>
  );
}

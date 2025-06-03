import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const categories = [
  "all",
  "portfolio",
  "academic",
  "resume",
  "creative",
  "professional",
  "research",
  "service",
  "medical",
  "ml",
];

type PortfolioItem = {
  _id: string;
  title: string;
  category: string;
  client?: string;
  description?: string;
  tags?: string[];
  externalLink?: string;
  imageUrl?: string;
  image?: string;
};

const PortfolioGrid = () => {
  const [filter, setFilter] = useState("all");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [visibleItems, setVisibleItems] = useState(6);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url =
          filter === "all"
            ? "https://yugbytes-official-main-2.onrender.com/api/portfolio"
            : `https://yugbytes-official-main-2.onrender.com/api/portfolio?category=${filter}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setPortfolioItems(data.data);
          setVisibleItems(6);
        }
      } catch (error) {
        console.error("Error fetching portfolio projects:", error);
      }
    };
    fetchProjects();
  }, [filter]);

  const filteredItems = portfolioItems;
  const displayedItems = filteredItems.slice(0, visibleItems);

  const loadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 3, filteredItems.length));
  };

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((tag) => (
            <Button
              key={tag}
              variant={filter === tag ? "default" : "outline"}
              className="rounded-full text-sm"
              onClick={() => setFilter(tag)}
            >
              {tag === "all"
                ? "All Projects"
                : tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedItems.map((item, index) => {
            // Updated image source logic to handle base64 data URLs from MongoDB
            const imgSrc =
              item.imageUrl && item.imageUrl.startsWith("data:")
                ? item.imageUrl
                : item.imageUrl && item.imageUrl.startsWith("http")
                ? item.imageUrl
                : item.imageUrl
                ? `https://yugbytes-official-main-2.onrender.com${item.imageUrl}`
                : item.image && item.image.startsWith("http")
                ? item.image
                : item.image
                ? `https://yugbytes-official-main-2.onrender.com${item.image}`
                : "https://via.placeholder.com/400x300?text=No+Image";
            return (
              <div
                key={item._id}
                className="group bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 text-white">
                      <div className="text-sm font-medium mb-1">
                        {item.category}
                      </div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-accent mb-1">
                        {item.category}
                      </div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <div className="text-sm text-muted-foreground mb-3">
                        {item.client}
                      </div>
                    </div>
                    {item.externalLink ? (
                      <a
                        href={item.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary/10 rounded-full p-2 text-primary hover:bg-primary/20 transition-colors"
                        aria-label={`Visit ${item.title}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <span
                        className="bg-primary/10 rounded-full p-2 text-primary opacity-50 cursor-not-allowed"
                        aria-label={`No external link`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {visibleItems < filteredItems.length && (
          <div className="text-center mt-12">
            <Button variant="outline" onClick={loadMore}>
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioGrid;

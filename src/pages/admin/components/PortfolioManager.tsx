import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PortfolioItem {
  _id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  image: string;
  tags: string[];
  externalLink?: string;
}

const PortfolioManager = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<PortfolioItem>();

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const response = await fetch("/api/portfolio", {
        credentials: "include",
      });
      const data = await response.json();
      setPortfolioItems(data.data);
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: PortfolioItem) => {
    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...data,
          tags: data.tags.toString().split(",").map((tag) => tag.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add portfolio item");
      }

      toast({
        title: "Success",
        description: "Portfolio item added successfully",
      });

      reset();
      fetchPortfolioItems();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add portfolio item",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete portfolio item");
      }

      toast({
        title: "Success",
        description: "Portfolio item deleted successfully",
      });

      fetchPortfolioItems();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete portfolio item",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading portfolio items...</div>;
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input {...register("title")} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Input {...register("category")} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Client</label>
            <Input {...register("client")} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <Input {...register("image")} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              External Link (optional)
            </label>
            <Input {...register("externalLink")} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Tags (comma-separated)
            </label>
            <Input {...register("tags")} required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea {...register("description")} required />
        </div>
        <Button type="submit">Add Portfolio Item</Button>
      </form>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolioItems.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.client}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PortfolioManager;
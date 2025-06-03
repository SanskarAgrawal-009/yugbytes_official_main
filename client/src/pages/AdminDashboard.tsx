import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import ThemeToggle from '../components/ui/theme-toggle';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogTrigger } from '../components/ui/dialog';


const AdminDashboard = () => {
  const { toast } = useToast();

  type Project = {
    _id: string;
    title: string;
    category: string;
    client: string;
    description: string;
    tags: string[];
    externalLink?: string;
    showOnHomepage: boolean;
    imageUrl?: string;
    createdAt?: string;
  };

  // Contact type definition
  type Contact = {
    status: string;
    _id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: string;
  };

  // Contact submissions state
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactFilter, setContactFilter] = useState('');
  const [contactSort, setContactSort] = useState<'asc' | 'desc'>('desc');

  // Portfolio state
  const [portfolio, setPortfolio] = useState<Project[]>([]);
  const [portfolioFilter, setPortfolioFilter] = useState('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState({
    title: '',
    category: '',
    client: '',
    description: '',
    tags: '',
    externalLink: '',
    showOnHomepage: false,
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Notes state for contacts (keyed by contact._id)
  const [contactNotes, setContactNotes] = useState<{ [id: string]: string }>({});

  // Status state for contacts (keyed by contact._id)
  const [contactStatus, setContactStatus] = useState<{ [id: string]: string }>({});

  // Fetch contacts
  const fetchContacts = async () => {
    try {

      const res = await fetch('https://yugbytes-official-main-2.onrender.com/api/contact', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
        // Initialize status state
        const statusMap: { [id: string]: string } = {}; 
        data.data.forEach((c: any) => {
          statusMap[c._id] = c.status || "";
        });
        setContactStatus(statusMap);
      } else {
        toast({ title: 'Failed to fetch contacts', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error fetching contacts', variant: 'destructive' });
    }
  };

  // Fetch portfolio
  const fetchPortfolio = async () => {
    try {
      const url = portfolioFilter ? `https://yugbytes-official-main-2.onrender.com/api/portfolio?category=${portfolioFilter}` : 'https://yugbytes-official-main-2.onrender.com/api/portfolio';
      const res = await fetch(url, { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        setPortfolio(data.data);
      } else {
        toast({ title: 'Failed to fetch portfolio', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error fetching portfolio', variant: 'destructive' });
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [contactSort, contactFilter]);

  useEffect(() => {
    fetchPortfolio();
  }, [portfolioFilter]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else if (type === 'file') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit add/edit project
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('category', form.category);
      formData.append('client', form.client);
      formData.append('description', form.description);
      formData.append('tags', form.tags);
      formData.append('externalLink', form.externalLink);
      formData.append('showOnHomepage', form.showOnHomepage ? 'true' : 'false');
      if (form.image) {
        formData.append('image', form.image);
      }

      const url = editingProject ? `https://yugbytes-official-main-2.onrender.com/api/portfolio/${editingProject._id}` : 'https://yugbytes-official-main-2.onrender.com/api/portfolio';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        credentials: 'include',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        toast({ title: `Project ${editingProject ? 'updated' : 'added'} successfully` });
        setForm({
          title: '',
          category: '',
          client: '',
          description: '',
          tags: '',
          externalLink: '',
          showOnHomepage: false,
          image: null,
        });
        setEditingProject(null);
        fetchPortfolio();
        setIsAddDialogOpen(false);
      } else {
        toast({ title: data.message || 'Failed to save project', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error saving project', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // Edit project
  const handleEdit = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      category: project.category,
      client: project.client,
      description: project.description,
      tags: project.tags.join(', '),
      externalLink: project.externalLink || '',
      showOnHomepage: project.showOnHomepage,
      image: null,
    });
    setIsAddDialogOpen(true);
  };

  // Delete project
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`https://yugbytes-official-main-2.onrender.com/api/portfolio/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: 'Project deleted' });
        fetchPortfolio();
      } else {
        toast({ title: data.message || 'Failed to delete project', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error deleting project', variant: 'destructive' });
    }
  };

  // Toggle showOnHomepage
  const handleToggleShow = async (project, newValue: boolean) => {
    try {
      const res = await fetch(`https://yugbytes-official-main-2.onrender.com/api/portfolio/${project._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showOnHomepage: newValue }),
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: 'Project visibility updated' });
        fetchPortfolio();
      } else {
        toast({ title: data.message || 'Failed to update visibility', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error updating visibility', variant: 'destructive' });
    }
  };

  // Filter and sort contacts
  const filteredContacts = contacts
    .filter(c =>
      c.name.toLowerCase().includes(contactFilter.toLowerCase()) ||
      c.email.toLowerCase().includes(contactFilter.toLowerCase()) ||
      c.phone.toLowerCase().includes(contactFilter.toLowerCase())
    )
    .sort((a, b) => {
      if (contactSort === 'asc') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      else return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const handleNoteChange = (id: string, value: string) => {
    setContactNotes(prev => ({ ...prev, [id]: value }));
  };

  const handleStatusChange = async (id: string, value: string) => {
    setContactStatus(prev => ({ ...prev, [id]: value }));
    try {
      const res = await fetch(`https://yugbytes-official-main-2.onrender.com/api/contact/${id}/status`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: value }),
      });
      const data = await res.json();
      if (!data.success) {
        toast({ title: data.message || 'Failed to update status', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error updating status', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground p-8 max-w-7xl mx-auto">
      <header className="flex justify-end mb-4">
        <ThemeToggle />
      </header>
      <h1 className="text-3xl font-bold mb-6">Yugbytes Web Control</h1>
      <Tabs defaultValue="contacts" className="mb-8">
        <TabsList>
          <TabsTrigger value="contacts">Feedbacks</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Sytem</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts">
          <div className="mb-8 bg-card rounded-xl shadow-lg p-4 overflow-x-auto">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <Input
                placeholder="Search by name, email, or phone"
                value={contactFilter}
                onChange={e => setContactFilter(e.target.value)}
                className="max-w-xs mb-2 sm:mb-0"
              />
              <select
                value={contactSort}
                onChange={e => setContactSort(e.target.value as 'asc' | 'desc')}
                className="border rounded p-1 bg-background text-foreground"
              >
                <option value="desc">Newest On top</option>
                <option value="asc">Eldest on top</option>
              </select>
            </div>
            <div className="rounded-xl overflow-hidden border border-border">
              <Table className="min-w-full border-separate border-spacing-0">
                <TableHeader className="bg-accent/40 sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="border-b border-border px-4 py-3">Name</TableHead>
                    <TableHead className="border-b border-border px-4 py-3">Email</TableHead>
                    <TableHead className="border-b border-border px-4 py-3">Phone</TableHead>
                    <TableHead className="border-b border-border px-4 py-3">Message</TableHead>
                    <TableHead className="border-b border-border px-4 py-3">Date</TableHead>
                    <TableHead className="border-b border-border px-4 py-3">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No submissions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredContacts.map((contact, idx) => (
                      <TableRow
                        key={contact._id}
                        className={`transition hover:bg-accent/20 ${idx % 2 === 0 ? "bg-background" : "bg-accent/10"}`}
                      >
                        <TableCell className="border-b border-border px-4 py-3 font-medium">{contact.name}</TableCell>
                        <TableCell className="border-b border-border px-4 py-3">
                          <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                            {contact.email}
                          </a>
                        </TableCell>
                        <TableCell className="border-b border-border px-4 py-3">
                          <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                            {contact.phone}
                          </a>
                        </TableCell>
                        <TableCell className="border-b border-border px-4 py-3 max-w-xs truncate" title={contact.message}>
                          {contact.message}
                        </TableCell>
                        <TableCell className="border-b border-border px-4 py-3">
                          <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs font-semibold">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </span>
                        </TableCell>
                        <TableCell className="border-b border-border px-4 py-3">
                          <select
                            className="w-full px-2 py-1 border rounded bg-background text-foreground"
                            value={contactStatus[contact._id] ?? contact.status ?? ""}
                            onChange={e => handleStatusChange(contact._id, e.target.value)}
                          >
                            <option value="">Select status</option>
                            <option value="contacted">Contacted</option>
                            <option value="don't wanted">Don't Wanted</option>
                            <option value="onboarded">Onboarded</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="closed">Closed</option>
                          </select>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="portfolio">
          <div className="mb-6 flex justify-between items-center">
            <Label htmlFor="categoryFilter">Filter by Category</Label>
            <Input
              id="categoryFilter"
              placeholder="Category"
              value={portfolioFilter}
              onChange={e => setPortfolioFilter(e.target.value)}
              className="max-w-xs"
            />
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default">Add New Project</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl p-0 overflow-hidden">
                <div className="bg-card p-6 rounded-lg shadow-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold mb-2">
                      {editingProject ? 'Edit Project' : 'Add New Project'}
                    </DialogTitle>
                    <p className="text-muted-foreground mb-4">
                      {editingProject
                        ? 'Update the details of your project below.'
                        : 'Fill out the form to add a new project to your portfolio.'}
                    </p>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="font-semibold">Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={form.title}
                          onChange={handleChange}
                          required
                          className="mt-1 focus:ring-2 focus:ring-primary transition"
                          placeholder="Project Title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category" className="font-semibold">Category</Label>
                        <Input
                          id="category"
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          required
                          className="mt-1 focus:ring-2 focus:ring-primary transition"
                          placeholder="e.g. Web, ML, Design"
                        />
                      </div>
                      <div>
                        <Label htmlFor="client" className="font-semibold">Client</Label>
                        <Input
                          id="client"
                          name="client"
                          value={form.client}
                          onChange={handleChange}
                          required
                          className="mt-1 focus:ring-2 focus:ring-primary transition"
                          placeholder="Client Name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="tags" className="font-semibold">Tags</Label>
                        <Input
                          name="tags"
                          value={form.tags}
                          onChange={handleChange}
                          className="mt-1 focus:ring-2 focus:ring-primary transition"
                          placeholder="Comma separated (e.g. React, Node)"
                        />
                      </div>
                      <div>
                        <Label htmlFor="externalLink" className="font-semibold">Project Link</Label>
                        <Input
                          id="externalLink"
                          name="externalLink"
                          value={form.externalLink}
                          onChange={handleChange}
                          className="mt-1 focus:ring-2 focus:ring-primary transition"
                          placeholder="https://yourproject.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-4 flex flex-col">
                      <div>
                        <Label htmlFor="description" className="font-semibold">Description</Label>
                        <textarea
                          id="description"
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          required
                          className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-primary transition min-h-[120px]"
                          placeholder="Describe your project..."
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          id="showOnHomepage"
                          name="showOnHomepage"
                          type="checkbox"
                          checked={form.showOnHomepage}
                          onChange={handleChange}
                          className="accent-primary w-5 h-5"
                        />
                        <Label htmlFor="showOnHomepage" className="font-semibold cursor-pointer">
                          Show on Homepage
                        </Label>
                      </div>
                      <div>
                        <Label htmlFor="image" className="font-semibold">Image</Label>
                        <div className="flex items-center gap-4 mt-1">
                          <Input
                            id="image"
                            name="image"
                            type="file"
                            onChange={handleChange}
                            accept="image/*"
                            className="flex-1"
                          />
                          {form.image && (
                            <img
                              src={URL.createObjectURL(form.image)}
                              alt="Preview"
                              className="w-16 h-16 object-cover rounded border"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                      <Button type="submit" disabled={loading} className="w-32">
                        {loading ? 'Saving...' : editingProject ? 'Update Project' : 'Add Project'}
                      </Button>
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => {
                            setEditingProject(null);
                            setForm({
                              title: '',
                              category: '',
                              client: '',
                              description: '',
                              tags: '',
                              externalLink: '',
                              showOnHomepage: false,
                              image: null,
                            });
                          }}
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                    </div>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Show on Homepage</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.map(project => (
                <TableRow key={project._id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant={project.showOnHomepage ? "secondary" : "outline"}
                      className={project.showOnHomepage ? "text-green-700 border-green-600" : "text-gray-600"}
                      onClick={() => handleToggleShow(project, !project.showOnHomepage)}
                    >
                      {project.showOnHomepage ? "Enabled" : "Disabled"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                      Edit
                    </Button>{' '}
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(project._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;


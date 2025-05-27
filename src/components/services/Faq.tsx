
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer: "Our turnaround times vary by project type: Resume & Landing Pages (1-2 days), Portfolio Websites (2-3 days), and Academic Project Websites (3-5 days). More complex projects may require additional time which we'll discuss during consultation."
  },
  {
    question: "What is your pricing structure?",
    answer: "We offer transparent pricing starting at ₹999 for consultations, ₹2,999 for resume/landing pages, ₹3,999 for academic project websites, and ₹4,999 for portfolio websites. Each project is unique, so the final price depends on specific requirements and features needed."
  },
  {
    question: "Do you offer student discounts?",
    answer: "Yes! We offer special pricing for students. Simply provide valid student ID or an .edu email address during the consultation phase to qualify for our student discount."
  },
  {
    question: "Will I be able to update my website myself?",
    answer: "Yes, we can build your site on user-friendly platforms that allow for easy updates. Alternatively, we offer maintenance packages if you prefer us to handle updates for you."
  },
  {
    question: "Do you provide hosting services?",
    answer: "Yes, we can help you set up hosting and domain registration. We'll recommend the most cost-effective hosting solution based on your needs and can manage the technical setup process for you."
  },
  {
    question: "What information do you need from me to get started?",
    answer: "To get started, we'll need your content (text, images, logo if available), any design preferences, and information about your target audience. Don't worry if you don't have everything ready - we can guide you through the process."
  },
  {
    question: "How do revisions work?",
    answer: "Each project includes two rounds of revisions to ensure you're completely satisfied with the final result. Additional revision rounds can be arranged at a modest fee."
  },
  {
    question: "Can you help with content writing for my website?",
    answer: "Yes, we offer content writing services at an additional cost. Our writers can help create professional, engaging content that effectively communicates your message."
  },
];

const Faq = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container">
        <h2 className="section-heading">Frequently Asked Questions</h2>
        <p className="section-subheading">
          Find answers to our most commonly asked questions about our services, process, and pricing.
        </p>
        
        <div className="max-w-3xl mx-auto mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-left font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;

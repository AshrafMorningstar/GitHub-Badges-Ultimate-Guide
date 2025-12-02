import React from 'react';
import { FAQS } from '../constants';
import { HelpCircle } from 'lucide-react';

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => (
  <details className="group bg-github-bg border border-github-border rounded-lg [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-github-text hover:bg-github-subtle/50 transition-colors">
      <h4 className="font-semibold flex items-center gap-2">
        <HelpCircle size={16} className="text-github-muted" />
        {q}
      </h4>
      <div className="white-space-nowrap text-github-muted group-open:-rotate-180 transition-transform duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </summary>
    <p className="px-4 pb-4 pt-0 text-sm text-github-muted leading-relaxed pl-10">
      {a}
    </p>
  </details>
);

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-16 container mx-auto px-6 max-w-3xl">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-github-header mb-2">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <FAQItem key={idx} q={faq.q} a={faq.a} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
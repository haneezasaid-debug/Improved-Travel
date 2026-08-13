import React, { useEffect, useState } from 'react';
import { MessageSquare, AlertCircle } from 'lucide-react';

interface DisqusCommentsProps {
  pageUrl?: string;
  pageIdentifier?: string;
  title?: string;
}

declare global {
  interface Window {
    disqus_config?: () => void;
    DISQUS?: {
      reset: (options: { reload: boolean; config: () => void }) => void;
    };
  }
}

export const DisqusComments: React.FC<DisqusCommentsProps> = ({
  pageUrl,
  pageIdentifier,
  title = 'Travel Discussion'
}) => {
  const [loadError, setLoadError] = useState(false);
  const shortname = 'haneeza-travel';
  const currentUrl = pageUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const currentIdentifier = pageIdentifier || `itinerary-${title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;

  useEffect(() => {
    // Suppress cross-origin script error events triggered by third-party embed scripts
    const handleGlobalError = (event: ErrorEvent) => {
      if (event.message === 'Script error.' || (event.filename && event.filename.includes('disqus'))) {
        console.warn('Handled cross-origin third-party script event:', event.message);
        event.preventDefault();
        return true;
      }
    };

    window.addEventListener('error', handleGlobalError);

    try {
      // Configure Disqus
      window.disqus_config = function (this: { page: { url: string; identifier: string; title: string } }) {
        this.page.url = currentUrl;
        this.page.identifier = currentIdentifier;
        this.page.title = title;
      };

      if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
        // If Disqus script is already on page, reload thread safely
        try {
          window.DISQUS.reset({
            reload: true,
            config: window.disqus_config
          });
        } catch (resetErr) {
          console.warn('Disqus thread reset notice:', resetErr);
        }
      } else {
        // Inject embed script
        const scriptId = 'disqus-embed-script';
        if (!document.getElementById(scriptId)) {
          const d = document;
          const s = d.createElement('script');
          s.id = scriptId;
          s.src = `https://${shortname}.disqus.com/embed.js`;
          s.setAttribute('data-timestamp', (+new Date()).toString());
          s.async = true;
          s.onerror = () => {
            console.warn('Disqus embed script failed to load or was blocked.');
            setLoadError(true);
          };
          (d.head || d.body).appendChild(s);
        }
      }

      // Inject count script
      const countScriptId = 'dsq-count-scr';
      if (!document.getElementById(countScriptId)) {
        const d = document;
        const s = d.createElement('script');
        s.id = countScriptId;
        s.src = `https://${shortname}.disqus.com/count.js`;
        s.async = true;
        s.onerror = () => {
          console.warn('Disqus count script failed to load or was blocked.');
        };
        (d.head || d.body).appendChild(s);
      }
    } catch (err) {
      console.warn('Disqus configuration error:', err);
      setLoadError(true);
    }

    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  }, [currentIdentifier, currentUrl, title]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-xs space-y-6 mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E2D9] pb-4">
        <div>
          <span className="text-xs font-sans uppercase tracking-widest text-[#C85A32] font-semibold flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            Traveler Community Forum
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#1E232A] mt-1">
            Discussions & Tips for {title}
          </h3>
        </div>
        <span className="text-xs font-semibold text-[#6B7280] bg-[#FAF8F5] px-3 py-1.5 rounded-full border border-[#E8E2D9] w-fit">
          Powered by Disqus
        </span>
      </div>

      {loadError ? (
        <div className="p-4 rounded-2xl bg-[#FFF8F6] border border-[#FCD8D0] text-xs text-[#9E3018] flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-[#C85A32] flex-shrink-0" />
          <div>
            <p className="font-semibold text-[#802410]">Discussion forum could not connect</p>
            <p className="text-[#9E3018] mt-0.5">
              The Disqus comments script was blocked or unavailable in this view. Ensure network access is permitted or view in a new tab.
            </p>
          </div>
        </div>
      ) : (
        <div id="disqus_thread" className="min-h-[220px]"></div>
      )}

      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript" rel="nofollow" className="text-[#C85A32] underline">
          comments powered by Disqus.
        </a>
      </noscript>
    </div>
  );
};


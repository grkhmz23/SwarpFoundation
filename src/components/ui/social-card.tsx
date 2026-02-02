"use client";

import React from "react";

// SVG Icons
const InstagramIcon = () => (
  <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
    <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
    <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

interface SocialCardProps {
  title?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  discordUrl?: string;
  telegramUrl?: string;
  githubUrl?: string;
}

export function SocialCard({
  title = "Connect",
  instagramUrl = "https://instagram.com/swarpfoundation",
  twitterUrl = "https://x.com/swarpfoundation",
  discordUrl = "https://discord.gg/swarp",
  telegramUrl = "https://t.me/swarpfoundation",
  githubUrl = "https://github.com/swarp-foundation",
}: SocialCardProps) {
  const socialLinks = [
    { href: instagramUrl, icon: <InstagramIcon />, color: "from-pink-500 via-red-500 to-yellow-500", hoverBg: "hover:bg-gradient-to-br hover:from-pink-500/20 hover:to-yellow-500/20" },
    { href: twitterUrl, icon: <TwitterIcon />, color: "from-gray-700 to-gray-900", hoverBg: "hover:bg-gray-800/50" },
    { href: discordUrl, icon: <DiscordIcon />, color: "from-indigo-500 to-purple-600", hoverBg: "hover:bg-indigo-500/20" },
    { href: telegramUrl, icon: <TelegramIcon />, color: "from-blue-400 to-blue-600", hoverBg: "hover:bg-blue-500/20" },
    { href: githubUrl, icon: <GithubIcon />, color: "from-gray-600 to-gray-800", hoverBg: "hover:bg-gray-700/30" },
  ];

  return (
    <div className="relative group">
      {/* Card Container */}
      <div className="relative overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm p-4">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Animated Border Glow */}
        <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-purple-500/0 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10">
          {/* Title */}
          <div className="text-center mb-4">
            <span className="text-xs font-mono text-cyan-400/70 tracking-widest uppercase">{title}</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-2">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  relative p-3 rounded-lg border border-gray-800 bg-gray-900/50
                  text-gray-400 hover:text-white
                  transition-all duration-300 ease-out
                  hover:border-cyan-500/50 hover:scale-110 hover:-translate-y-1
                  hover:shadow-[0_0_20px_rgba(0,255,240,0.2)]
                  ${social.hoverBg}
                `}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Icon Glow on Hover */}
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${social.color} opacity-0 hover:opacity-10 transition-opacity duration-300`} />
                <span className="relative z-10">{social.icon}</span>
              </a>
            ))}
          </div>

          {/* Bottom Accent Line */}
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}

export default SocialCard;
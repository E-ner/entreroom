import { useState, useRef, useCallback } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Image,
  FileText,
  CalendarDays,
  BadgeCheck,
  TrendingUp,
  ChevronRight,
  UserPlus,
  Check,
  Send,
  X,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// FIREBASE INTEGRATION — uncomment when ready
// import { db, auth } from "./firebase";
// import { collection, addDoc, updateDoc, arrayUnion, arrayRemove,
//   doc, onSnapshot, query, orderBy, limit, startAfter, serverTimestamp } from "firebase/firestore";
// ─────────────────────────────────────────────────────────────────────────────

// ── Exact tokens from your homepage CSS ──────────────────────────────────────
const SAND = "#f6f1e9"; // --sand
const INK = "#1f1c17"; // --ink
const INK_M = "#3f372f"; // --ink-muted
const CLAY = "#e7d7c4"; // --clay
const TEAL = "#0f766e"; // --teal
const PINE = "#0b3d3a"; // --pine  ← PRIMARY deep green for all buttons

// ── Seed data ──────────────────────────────────────────────────────────────────
const POOL = [
  {
    user: {
      name: "Elena Rodriguez",
      role: "Head of Strategy · Aether Corp",
      initials: "ER",
      verified: true,
    },
    tag: "Strategic",
    tagType: "aligned",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    content:
      "The infrastructure of B2B commerce is shifting. By 2026, transparency isn't a feature—it's the currency. We're rebuilding our supply chain nodes to reflect this reality.",
  },
  {
    user: {
      name: "Marcus Chen",
      role: "Venture Partner · Nexus Capital",
      initials: "MC",
      verified: true,
    },
    tag: "Trending",
    tagType: "trending",
    image: null,
    content:
      "Networking is dead. Node-building is the future. Don't collect contacts — build specialised value-clusters that compound over time. The founders winning right now understand this deeply.",
  },
  {
    user: {
      name: "Priya Nair",
      role: "Product Lead · Fold Systems",
      initials: "PN",
      verified: false,
    },
    tag: "Product",
    tagType: "motion",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    content:
      "Just shipped our real-time analytics dashboard after 6 weeks of iteration. The biggest lesson: your users will always surprise you. Ship fast, listen faster.",
  },
  {
    user: {
      name: "Aisha Mensah",
      role: "CEO · Greenlane Labs",
      initials: "AM",
      verified: true,
    },
    tag: "Strategic",
    tagType: "aligned",
    image: null,
    content:
      "Climate tech isn't a niche anymore. Every B2B pitch deck in 2026 has a sustainability slide — but very few have a sustainability strategy. There's a gap worth filling.",
  },
];

const makePosts = (page = 0) =>
  Array.from({ length: 6 }, (_, i) => {
    const p = POOL[(page * 6 + i) % POOL.length];
    return {
      ...p,
      id: `post-p${page}-${i}`,
      time: `${page * 6 + i + 1}h ago`,
      likes: Math.floor(Math.random() * 160) + 8,
      comments: [],
      shares: Math.floor(Math.random() * 40) + 2,
    };
  });

const SUGGESTIONS = [
  {
    id: "u1",
    name: "Julian Vane",
    role: "Design Director · Studio Arc",
    initials: "JV",
    mutual: 12,
  },
  {
    id: "u2",
    name: "Sarah Al-Farsi",
    role: "Legal Counsel · Meridian",
    initials: "SA",
    mutual: 8,
  },
  {
    id: "u3",
    name: "Tech Ventures",
    role: "Institutional · Series A–C",
    initials: "TV",
    mutual: 5,
  },
  {
    id: "u4",
    name: "Omar Khalil",
    role: "CTO · Fluxbase",
    initials: "OK",
    mutual: 19,
  },
];

const TICKER = [
  "SAAS +2.1%",
  "B2B −0.4%",
  "AI_LOGISTICS ↑",
  "FINTECH +1.7%",
  "HEALTH_TECH +3.2%",
  "CLIMATE ↑↑",
  "DTC −1.1%",
  "INFRA +0.9%",
];

// Tag badge styles using pine/teal
const TAG = {
  aligned: {
    bg: "rgba(11,61,58,0.10)",
    color: PINE,
    border: "rgba(11,61,58,0.25)",
  },
  trending: {
    bg: "rgba(15,118,110,0.10)",
    color: TEAL,
    border: "rgba(15,118,110,0.25)",
  },
  motion: { bg: "rgba(31,28,23,0.07)", color: INK_M, border: CLAY },
};

// Shared card surface style
const CARD = {
  background: "#fffdf8",
  border: `1px solid ${CLAY}`,
  boxShadow: "0 2px 16px -8px rgba(31,28,23,0.12)",
};

// ── Avatar ─────────────────────────────────────────────────────────────────────
function Avatar({ initials, size = "md", pine = false }) {
  const sz = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  }[size];
  return (
    <div
      className={`${sz} rounded-xl flex items-center justify-center font-bold tracking-wide shrink-0 select-none`}
      style={{
        background: pine ? PINE : INK,
        color: SAND,
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {initials}
    </div>
  );
}

// ── Reusable deep-green button ─────────────────────────────────────────────────
function PineBtn({
  children,
  onClick,
  disabled,
  small = false,
  outline = false,
  className = "",
}) {
  const pad = small
    ? { padding: "0.3rem 0.85rem", fontSize: "0.72rem" }
    : { padding: "0.5rem 1.1rem", fontSize: "0.85rem" };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 font-semibold transition-opacity ${className}`}
      style={{
        ...pad,
        borderRadius: 999,
        border: `1px solid ${PINE}`,
        fontFamily: "inherit",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 600,
        background: outline ? "transparent" : PINE,
        color: outline ? PINE : SAND,
        opacity: disabled ? 0.4 : 1,
      }}
      onMouseEnter={(e) =>
        !disabled && (e.currentTarget.style.opacity = "0.82")
      }
      onMouseLeave={(e) => !disabled && (e.currentTarget.style.opacity = "1")}
    >
      {children}
    </button>
  );
}

// ── Share Modal ────────────────────────────────────────────────────────────────
function ShareModal({ post, onClose, onRepost }) {
  const [copied, setCopied] = useState(false);
  const link = `https://entreroom.app/post/${post.id}`;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(31,28,23,0.4)", backdropFilter: "blur(6px)" }}
    >
      <div className="rounded-2xl w-full max-w-sm p-6" style={{ ...CARD }}>
        <div className="flex items-center justify-between mb-5">
          <h3
            className="font-bold text-sm"
            style={{ fontFamily: "'Space Grotesk',sans-serif", color: INK }}
          >
            Share Post
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-stone-100 transition-colors"
            style={{ color: INK_M }}
          >
            <X size={14} />
          </button>
        </div>
        <div className="flex gap-2 mb-3">
          <input
            readOnly
            value={link}
            className="flex-1 text-xs rounded-xl px-3 py-2 outline-none"
            style={{
              background: SAND,
              border: `1px solid ${CLAY}`,
              color: INK_M,
            }}
          />
          <PineBtn
            small
            onClick={() => {
              navigator.clipboard?.writeText(link);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </PineBtn>
        </div>
        <PineBtn
          className="w-full justify-center"
          onClick={() => {
            onRepost(post);
            onClose();
          }}
        >
          Repost to Feed
        </PineBtn>
      </div>
    </div>
  );
}

// ── Post Card ──────────────────────────────────────────────────────────────────
function PostCard({ post, onLike, onRepost }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments ?? []);
  const [sharing, setSharing] = useState(false);

  const handleLike = () => {
    const n = !liked;
    setLiked(n);
    onLike(post.id, n);
  };
  const submit = () => {
    if (!commentText.trim()) return;
    setComments((prev) => [
      {
        id: Date.now(),
        text: commentText.trim(),
        user: "You",
        initials: "YO",
        time: "just now",
      },
      ...prev,
    ]);
    setCommentText("");
  };

  const tag = TAG[post.tagType];

  return (
    <>
      {sharing && (
        <ShareModal
          post={post}
          onClose={() => setSharing(false)}
          onRepost={onRepost}
        />
      )}
      <article className="rounded-2xl overflow-hidden" style={CARD}>
        {/* Post header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar initials={post.user.initials} />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  className="font-semibold text-sm"
                  style={{
                    color: INK,
                    fontFamily: "'Space Grotesk',sans-serif",
                  }}
                >
                  {post.user.name}
                </span>
                {post.user.verified && (
                  <BadgeCheck size={13} style={{ color: TEAL }} />
                )}
              </div>
              <p className="text-xs mt-0.5 truncate" style={{ color: INK_M }}>
                {post.user.role} · {post.time}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <span
              className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full hidden sm:inline-flex"
              style={{
                background: tag.bg,
                color: tag.color,
                border: `1px solid ${tag.border}`,
              }}
            >
              {post.tag}
            </span>
            <button
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors"
              style={{ color: INK_M }}
            >
              <MoreHorizontal size={14} />
            </button>
          </div>
        </div>

        {/* Image */}
        {post.image && (
          <div className="w-full aspect-[16/8] overflow-hidden">
            <img
              src={post.image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        )}

        {/* Content */}
        <div className="px-5 py-4">
          <p className="text-sm leading-relaxed" style={{ color: INK_M }}>
            {post.content}
          </p>
        </div>

        {/* Stats */}
        <div
          className="px-5 pb-3 flex items-center gap-3 text-[11px] font-medium"
          style={{ color: "#7a6e63" }}
        >
          <span>{post.likes + (liked ? 1 : 0)} likes</span>
          <span className="w-1 h-1 rounded-full" style={{ background: CLAY }} />
          <button
            onClick={() => setShowComments((v) => !v)}
            style={{
              color: showComments ? PINE : "#7a6e63",
              transition: "color .15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = PINE)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = showComments ? PINE : "#7a6e63")
            }
          >
            {comments.length} comments
          </button>
          <span className="w-1 h-1 rounded-full" style={{ background: CLAY }} />
          <span>{post.shares} shares</span>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px" style={{ background: CLAY }} />

        {/* Action row — all buttons go pine on hover/active */}
        <div className="px-2 py-1 flex">
          {[
            {
              label: liked ? "Liked" : "Like",
              icon: (
                <ThumbsUp
                  size={15}
                  fill={liked ? PINE : "none"}
                  color={liked ? PINE : "currentColor"}
                />
              ),
              action: handleLike,
              active: liked,
            },
            {
              label: "Comment",
              icon: <MessageCircle size={15} />,
              action: () => setShowComments((v) => !v),
              active: showComments,
            },
            {
              label: "Share",
              icon: <Share2 size={15} />,
              action: () => setSharing(true),
              active: false,
            },
            {
              label: saved ? "Saved" : "Save",
              icon: (
                <Bookmark
                  size={15}
                  fill={saved ? PINE : "none"}
                  color={saved ? PINE : "currentColor"}
                />
              ),
              action: () => setSaved((v) => !v),
              active: saved,
            },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold"
              style={{
                color: btn.active ? PINE : INK_M,
                background: btn.active ? "rgba(11,61,58,0.08)" : "transparent",
                transition: "background .15s, color .15s",
              }}
              onMouseEnter={(e) => {
                if (!btn.active) {
                  e.currentTarget.style.background = "rgba(11,61,58,0.07)";
                  e.currentTarget.style.color = PINE;
                }
              }}
              onMouseLeave={(e) => {
                if (!btn.active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = INK_M;
                }
              }}
            >
              {btn.icon}
              <span className="hidden sm:inline">{btn.label}</span>
            </button>
          ))}
        </div>

        {/* Comments */}
        {showComments && (
          <div
            className="px-5 pb-5 pt-3 space-y-3 border-t"
            style={{ borderColor: CLAY }}
          >
            <div className="flex gap-2.5 items-center">
              <Avatar initials="YO" size="sm" pine />
              <div
                className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2 border"
                style={{
                  background: SAND,
                  borderColor: CLAY,
                  transition: "border-color .15s",
                }}
                onFocusCapture={(e) =>
                  (e.currentTarget.style.borderColor = PINE)
                }
                onBlurCapture={(e) =>
                  (e.currentTarget.style.borderColor = CLAY)
                }
              >
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder="Write a comment…"
                  className="flex-1 bg-transparent text-xs outline-none"
                  style={{ color: INK, fontFamily: "inherit" }}
                />
                <button
                  onClick={submit}
                  className="shrink-0 hover:opacity-70 transition-opacity"
                  style={{ color: PINE }}
                >
                  <Send size={13} />
                </button>
              </div>
            </div>
            {comments.length === 0 && (
              <p className="text-xs text-center py-1" style={{ color: INK_M }}>
                Be the first to comment
              </p>
            )}
            {comments.map((c) => (
              <div key={c.id} className="flex gap-2.5">
                <Avatar initials={c.initials} size="sm" />
                <div
                  className="flex-1 rounded-xl px-3 py-2"
                  style={{ background: SAND }}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-xs font-semibold"
                      style={{
                        color: INK,
                        fontFamily: "'Space Grotesk',sans-serif",
                      }}
                    >
                      {c.user}
                    </span>
                    <span className="text-[10px]" style={{ color: INK_M }}>
                      {c.time}
                    </span>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: INK_M }}
                  >
                    {c.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </article>
    </>
  );
}

// ── Create Post ────────────────────────────────────────────────────────────────
function CreatePost({ onPost }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [tag, setTag] = useState("Strategic");

  const submit = () => {
    if (!text.trim()) return;
    onPost({
      id: `post-${Date.now()}`,
      user: {
        name: "You",
        role: "EntreRoom Member",
        initials: "YO",
        verified: false,
      },
      time: "just now",
      tag,
      tagType:
        tag === "Strategic"
          ? "aligned"
          : tag === "Trending"
            ? "trending"
            : "motion",
      image: null,
      content: text.trim(),
      likes: 0,
      comments: [],
      shares: 0,
    });
    setText("");
    setOpen(false);
  };

  return (
    <div className="rounded-2xl p-4" style={CARD}>
      <div className="flex items-center gap-3">
        <Avatar initials="YO" pine />
        <button
          onClick={() => setOpen(true)}
          className="flex-1 rounded-xl px-4 py-2.5 text-sm text-left"
          style={{
            background: SAND,
            color: INK_M,
            border: `1px solid transparent`,
            transition: "border-color .15s",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = PINE)}
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "transparent")
          }
        >
          Share an insight with your network…
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-3">
          <textarea
            autoFocus
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
            style={{
              background: SAND,
              border: `1px solid ${CLAY}`,
              color: INK,
              fontFamily: "inherit",
              transition: "border-color .15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = PINE)}
            onBlur={(e) => (e.target.style.borderColor = CLAY)}
          />
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-1.5">
              {["Strategic", "Trending", "Product"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all"
                  style={
                    tag === t
                      ? { background: PINE, color: SAND, borderColor: PINE }
                      : {
                          background: "transparent",
                          color: INK_M,
                          borderColor: CLAY,
                        }
                  }
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-stone-100 transition-colors"
                style={{ color: INK_M }}
              >
                Cancel
              </button>
              <PineBtn small onClick={submit} disabled={!text.trim()}>
                Post
              </PineBtn>
            </div>
          </div>
        </div>
      )}

      {!open && (
        <div
          className="mt-3 pt-3 border-t flex gap-1"
          style={{ borderColor: CLAY }}
        >
          {[
            { label: "Media", icon: <Image size={14} /> },
            { label: "Article", icon: <FileText size={14} /> },
            { label: "Event", icon: <CalendarDays size={14} /> },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ color: INK_M }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(11,61,58,0.07)";
                e.currentTarget.style.color = PINE;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = INK_M;
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Feed — rendered by <Outlet /> in AppLayout. Zero nav. Zero header. ───
export default function EntreRoom() {
  const [posts, setPosts] = useState(() => makePosts(0));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [connections, setConnections] = useState({});
  const [activeFilter, setActiveFilter] = useState("All");

  const observer = useRef(null);
  const sentinelRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) loadMore();
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const loadMore = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      setPosts((prev) => [...prev, ...makePosts(page)]);
      setPage((p) => p + 1);
      if (page >= 4) setHasMore(false);
      setLoading(false);
    }, 800);
  };

  const handlePost = (p) => setPosts((prev) => [p, ...prev]);
  const handleLike = (id, liked) =>
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, likes: p.likes + (liked ? 1 : -1) } : p,
      ),
    );
  const handleRepost = (orig) =>
    setPosts((prev) => [
      {
        ...orig,
        id: `repost-${Date.now()}`,
        time: "just now",
        shares: orig.shares + 1,
        user: {
          name: "You",
          role: "Reposted",
          initials: "YO",
          verified: false,
        },
      },
      ...prev,
    ]);
  const handleConnect = (id) =>
    setConnections((prev) => ({ ...prev, [id]: !prev[id] }));
  const filtered =
    activeFilter === "All"
      ? posts
      : posts.filter((p) => p.tag === activeFilter);

  return (
    <div
      className="min-h-screen w-full pb-16 md:pb-0"
      style={{
        background: SAND,
        fontFamily: "'DM Sans', sans-serif",
        color: INK,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes spin   { to{transform:rotate(360deg)} }
        .er-ticker { animation: ticker 28s linear infinite; }
        .er-spin   { animation: spin 0.9s linear infinite; }
        ::-webkit-scrollbar       { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${CLAY}; border-radius: 99px; }
      `}</style>

      {/* ── PAGE BODY ───────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* ── FEED ────────────────────────────────────────────────────── */}
          <main className="w-full lg:flex-1 space-y-4 min-w-0">
            {/* Filter row */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: INK_M }}
              >
                Feed
              </span>
              <div className="flex items-center gap-1">
                {["All", "Strategic", "Trending", "Product"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className="px-3 py-1.5 text-xs font-semibold transition-all"
                    style={{
                      borderRadius: 999,
                      background: activeFilter === f ? PINE : "transparent",
                      color: activeFilter === f ? SAND : INK_M,
                      fontFamily: "inherit",
                    }}
                    onMouseEnter={(e) => {
                      if (activeFilter !== f)
                        e.currentTarget.style.color = PINE;
                    }}
                    onMouseLeave={(e) => {
                      if (activeFilter !== f)
                        e.currentTarget.style.color = INK_M;
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <CreatePost onPost={handlePost} />

            {filtered.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onRepost={handleRepost}
              />
            ))}

            {/* Infinite scroll sentinel */}
            <div
              ref={sentinelRef}
              className="py-6 flex items-center justify-center"
            >
              {loading && (
                <div
                  className="flex items-center gap-2 text-xs"
                  style={{ color: PINE }}
                >
                  <div
                    className="w-4 h-4 border-2 rounded-full er-spin"
                    style={{ borderColor: PINE, borderTopColor: "transparent" }}
                  />
                  Loading more…
                </div>
              )}
              {!hasMore && !loading && (
                <p className="text-xs" style={{ color: INK_M }}>
                  You're all caught up ✓
                </p>
              )}
            </div>
          </main>

          {/* ── RIGHT PANEL ─────────────────────────────────────────────── */}
          <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-4">
            {/* People You May Know */}
            <div className="rounded-2xl p-5" style={CARD}>
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: INK_M }}
                >
                  People You May Know
                </h2>
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: TEAL }}
                />
              </div>
              <div className="space-y-4">
                {SUGGESTIONS.map((s) => {
                  const connected = !!connections[s.id];
                  return (
                    <div
                      key={s.id}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                          style={{
                            background: connected ? PINE : INK,
                            color: SAND,
                            fontFamily: "'Space Grotesk',sans-serif",
                            transition: "background .2s",
                          }}
                        >
                          {s.initials}
                        </div>
                        <div className="min-w-0">
                          <p
                            className="text-sm font-semibold truncate"
                            style={{
                              color: INK,
                              fontFamily: "'Space Grotesk',sans-serif",
                            }}
                          >
                            {s.name}
                          </p>
                          <p
                            className="text-[11px] truncate"
                            style={{ color: INK_M }}
                          >
                            {s.mutual} mutual
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleConnect(s.id)}
                        className="shrink-0 text-[11px] font-bold px-2.5 py-1.5 rounded-full border flex items-center gap-1 whitespace-nowrap transition-opacity hover:opacity-85"
                        style={
                          connected
                            ? {
                                background: "transparent",
                                borderColor: CLAY,
                                color: INK_M,
                              }
                            : {
                                background: PINE,
                                borderColor: PINE,
                                color: SAND,
                              }
                        }
                      >
                        {connected ? (
                          <div className="text-xs flex items-center gap-x-1">
                            <Check size={10} />
                            Connected
                          </div>
                        ) : (
                          <div className="text-xs flex items-center gap-x-1">
                            <UserPlus size={10} />
                            Connect
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
              <PineBtn
                outline
                className="w-full justify-center mt-4 py-2 text-xs"
                onClick={() => {}}
              >
                View All <ChevronRight size={12} />
              </PineBtn>
            </div>

            {/* Market Pulse */}
            <div className="rounded-2xl p-5" style={CARD}>
              <h2
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: INK_M }}
              >
                Live Market Pulse
              </h2>
              <div className="space-y-2.5">
                {[
                  { label: "SaaS", val: "+2.1%", up: true },
                  { label: "B2B Commerce", val: "−0.4%", up: false },
                  { label: "AI Logistics", val: "+5.8%", up: true },
                  { label: "FinTech", val: "+1.7%", up: true },
                  { label: "DTC Brands", val: "−1.1%", up: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <span
                      className="text-xs font-medium"
                      style={{ color: INK_M }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-md"
                      style={
                        item.up
                          ? { background: "rgba(11,61,58,0.10)", color: PINE }
                          : {
                              background: "rgba(185,28,28,0.08)",
                              color: "#b91c1c",
                            }
                      }
                    >
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="rounded-2xl p-5" style={CARD}>
              <h2
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: INK_M }}
              >
                Trending Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "#B2B2026",
                  "#NodeBuilding",
                  "#SupplyChain",
                  "#AILogistics",
                  "#FutureOfWork",
                  "#VentureCapital",
                ].map((t) => (
                  <button
                    key={t}
                    className="text-[11px] font-semibold px-2.5 py-1.5 rounded-full border transition-all"
                    style={{
                      background: SAND,
                      borderColor: CLAY,
                      color: INK_M,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(11,61,58,0.08)";
                      e.currentTarget.style.borderColor = PINE;
                      e.currentTarget.style.color = PINE;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = SAND;
                      e.currentTarget.style.borderColor = CLAY;
                      e.currentTarget.style.color = INK_M;
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

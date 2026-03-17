import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreatePost, useLikePost, usePosts } from "../../hooks/useQueries";

const samplePosts = [
  {
    id: "post1",
    avatar: "👩",
    name: "Sunita Devi",
    location: "Jaipur, Rajasthan",
    content:
      "Aaj mera pehla order aaya! 🎉 3 hafte pehle maine Shakti Setu join kiya tha. Ab meri handmade bags sell ho rahi hain. Aap bhi try karein!",
    likes: 48,
    comments: 12,
    time: "2 ghante pehle",
  },
  {
    id: "post2",
    avatar: "👩‍🦱",
    name: "Rekha Ben",
    location: "Surat, Gujarat",
    content:
      "Digital Marketing course complete kiya! Ab Instagram pe apna page bana liya. Itna asaan tha, socha bhi nahi tha. Thank you Shakti Setu! 💜",
    likes: 72,
    comments: 18,
    time: "5 ghante pehle",
  },
  {
    id: "post3",
    avatar: "👩‍🦳",
    name: "Meena Kumari",
    location: "Lucknow, UP",
    content:
      "Is mahine ₹8,000 ki kamai ki! Ghar baithe hi! Jo sapna tha woh poora ho raha hai. Aap sab ka shukriya for the support 🙏✨",
    likes: 135,
    comments: 31,
    time: "1 din pehle",
  },
];

const successStories = [
  {
    name: "Priya S.",
    location: "Delhi",
    earning: "₹15,000/month",
    emoji: "🌟",
  },
  {
    name: "Kavita M.",
    location: "Pune",
    earning: "₹22,000/month",
    emoji: "🏆",
  },
  {
    name: "Radha D.",
    location: "Chennai",
    earning: "₹9,500/month",
    emoji: "💫",
  },
];

export default function CommunityScreen() {
  const [postText, setPostText] = useState("");
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const { data: backendPosts } = usePosts();
  const createPostMutation = useCreatePost();
  const likePostMutation = useLikePost();

  const posts =
    backendPosts && backendPosts.length > 0
      ? backendPosts.map((p) => ({
          id: p.id,
          avatar: "👩",
          name: `${p.author.toString().slice(0, 8)}...`,
          location: "India",
          content: p.content,
          likes: Number(p.likes),
          comments: 0,
          time: "abhi",
        }))
      : samplePosts;

  const handlePost = () => {
    if (!postText.trim()) return;
    const id = `post_${Date.now()}`;
    createPostMutation.mutate(
      { id, content: postText },
      {
        onSuccess: () => {
          setPostText("");
          toast.success("Post share ho gaya! 🎉");
        },
      },
    );
  };

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
    likePostMutation.mutate(postId);
  };

  return (
    <div className="flex flex-col">
      <div className="shakti-gradient px-5 pt-safe pb-5">
        <div className="pt-4">
          <h1 className="text-white text-xl font-bold">Samudaay 💜</h1>
          <p className="text-white/80 text-sm mt-1">5,000+ mahilaon ka saath</p>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        <Card className="border-0 shakti-card-shadow">
          <CardContent className="p-4">
            <div className="flex gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-lg flex-none">
                👩
              </div>
              <Textarea
                data-ocid="community.story.textarea"
                placeholder="Apni kahani share karein... 🌸"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="resize-none border-border text-sm rounded-2xl min-h-[80px] bg-background"
              />
            </div>
            <Button
              data-ocid="community.story.submit_button"
              onClick={handlePost}
              disabled={!postText.trim() || createPostMutation.isPending}
              className="w-full h-10 rounded-xl bg-primary text-white font-semibold text-sm"
            >
              <Send className="w-4 h-4 mr-2" />
              {createPostMutation.isPending
                ? "Share ho raha hai..."
                : "Share Karein"}
            </Button>
          </CardContent>
        </Card>

        <div>
          <h2 className="font-bold text-foreground text-sm mb-2">
            🏆 Success Stories
          </h2>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
            {successStories.map((s, i) => (
              <div
                key={s.name}
                data-ocid={`community.success.item.${i + 1}`}
                className="flex-none w-32 bg-card rounded-2xl p-3 shakti-card-shadow text-center"
              >
                <p className="text-2xl mb-1">{s.emoji}</p>
                <p className="text-xs font-bold text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.location}</p>
                <p className="text-xs font-semibold text-accent mt-1">
                  {s.earning}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-foreground text-sm mb-3">
            Samudaay Ki Awaaz 🗣️
          </h2>
          <div className="space-y-3">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                data-ocid={`community.post.item.${i + 1}`}
              >
                <Card className="border-0 shakti-card-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-lg flex-none">
                        {post.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">
                          {post.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {post.location} · {post.time}
                        </p>
                        <p className="text-sm text-foreground mt-2 leading-relaxed">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <button
                            type="button"
                            data-ocid={`community.post.toggle.${i + 1}`}
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                              likedPosts.has(post.id)
                                ? "text-red-500"
                                : "text-muted-foreground hover:text-red-500"
                            }`}
                          >
                            <Heart
                              className={`w-4 h-4 ${likedPosts.has(post.id) ? "fill-current" : ""}`}
                            />
                            {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                          </button>
                          <button
                            type="button"
                            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            {post.comments}
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

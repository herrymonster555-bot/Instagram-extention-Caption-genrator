const $ = (id) => document.getElementById(id);
const words = (s) => (s || "").trim().replace(/\s+/g, " ");
const cleanTopic = () => words($("topic").value) || "my latest Reel";
const hashify = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim().split(/\s+/).filter(Boolean).slice(0,4).map(w => "#" + w).join(" ");

function buildContent(topic, language, tone, trendTerms = []) {
  const t = topic.replace(/[.!?]+$/g, "").trim();
  const topicWords = t.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(w => w.length > 2);
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim().split(/\s+/).filter(Boolean).join("");
  const topicTag = topicWords.slice(0, 3).map(w => "#" + w).join("");
  const topicPhraseTag = topicWords.length ? "#" + slug(topicWords.slice(0, 3).join(" ")) : "";
  const tagSets = {
    cinematic: ["cinematicedit","videoedit","editz","visualstory","reelsindia","reels"],
    funny: ["funnyreels","comedyreels","relatable","memesdaily","reelsindia"],
    aesthetic: ["aesthetic","vibes","visualdiary","mood","reels"],
    gaming: ["gaming","gamingreels","gameplay","indiangamer","gamerlife"],
    educational: ["quicktips","knowledge","learnoninstagram","education","explained"],
    minimal: ["reels","dailycontent","creator","instagramreels"]
  };
  const safeTrendTerms = trendTerms.filter(Boolean).slice(0, 3);
  const topicHashtags = [
    topicPhraseTag,
    ...topicWords.slice(0, 3).map(w => "#" + w),
    ...safeTrendTerms.map(term => "#" + slug(term)).filter(h => h.length > 1)
  ];
  const hashtags = [...new Set([...topicHashtags, ...(tagSets[tone] || tagSets.minimal).map(x => "#" + x)])].slice(0, 12).join(" ");
  const templates = {
    hinglish: {
      cinematic: [`${t} — har frame ki apni story hai. 🎬✨`, `${t}: vibe, visuals aur feel — sab ek saath. 🖤`, `Is ${t} ka favourite moment kaunsa hai? 👀🎬`],
      funny: [`${t} aur meri overacting — perfect combo 😂🔥`, `POV: ${t} ko seriously lena impossible hai 💀😂`, `${t} dekh ke apni hasi control karke dikhao 😂`],
      aesthetic: [`${t} vibes, no explanation needed. 🌙✨`, `Thoda sa ${t}, thoda sa sukoon. 🤍`, `${t} — saved in a little moment. ✨`],
      gaming: [`${t} mein scene hi alag hai 🎮🔥`, `${t} gameplay: clutch, chaos aur full vibes. 🎮`, `${t} mein tumhara favourite moment kaunsa hai? 👀`],
      educational: [`${t} ke baare mein ek useful baat jo yaad rakhni chahiye. 💡`, `Save kar lo — ${t} par ye tip kaam aayegi. 📌`, `${t} ko simple words mein samjho. 💡`],
      minimal: [`${t}. Bas itna hi. ✨`, `${t} — captured in a moment. 🤍`, `Aaj ka focus: ${t}. ✨`]
    },
    english: {
      cinematic: [`Every frame tells a story: ${t}. 🎬`, `The mood, the visuals, the feeling — ${t}. ✨`, `Which moment from ${t} is your favourite? 👀`],
      funny: [`${t}, but make it chaotic. 😂`, `Try watching ${t} without laughing. 💀`, `POV: ${t} was not supposed to go this way. 😂`],
      aesthetic: [`A moment called ${t}. 🌙`, `Collecting little moments like ${t}. 🤍`, `${t} — a whole mood. ✨`],
      gaming: [`New level, same energy: ${t}. 🎮🔥`, `The ${t} gameplay hits different.`, `What was your favourite moment in ${t}? 🎮`],
      educational: [`One thing worth knowing about ${t}. 💡`, `Save this quick note about ${t}. 📌`, `${t}, explained simply. 💡`],
      minimal: [`${t}. Nothing more, nothing less.`, `A little moment: ${t}. ✨`, `Today's focus: ${t}.`]
    },
    hindi: {
      cinematic: [`${t} — हर फ्रेम की अपनी कहानी है। 🎬✨`, `${t}: विज़ुअल्स और एहसास, सब एक साथ। 🖤`, `${t} का आपका पसंदीदा पल कौन-सा है? 👀`],
      funny: [`${t} और मेरी ओवरएक्टिंग — कमाल का कॉम्बो 😂`, `${t} देखकर हँसी रोककर दिखाओ! 💀`, `${t} में ऐसा भी हो सकता है? 😂`],
      aesthetic: [`${t} वाली फीलिंग्स। 🌙✨`, `थोड़ा सुकून, थोड़ा ${t}। 🤍`, `${t} — एक खूबसूरत पल। ✨`],
      gaming: [`${t} में तो अलग ही लेवल है! 🎮🔥`, `${t} गेमप्ले का मज़ा ही अलग है।`, `${t} का आपका पसंदीदा पल कौन-सा है? 🎮`],
      educational: [`${t} के बारे में एक काम की बात। 💡`, `इस टिप को सेव कर लो — काम आएगी। 📌`, `${t} को आसान भाषा में समझें। 💡`],
      minimal: [`${t}। बस इतना ही। ✨`, `एक छोटा-सा पल: ${t}। 🤍`, `आज का फोकस: ${t}।`]
    }
  };
  const langTemplates = templates[language] || templates.hinglish;
  const choices = langTemplates[tone] || langTemplates.minimal;
  const caption = choices[Math.floor(Math.random() * choices.length)];
  const keywordSet = [...new Set([
    t, ...topicWords, `${t} ${tone}`, `${t} Instagram Reel`,
    ...safeTrendTerms, `${tone} content`, "Instagram Reel"
  ])].filter(Boolean);
  const keywords = keywordSet.join(", ");
  const descriptions = {
    hinglish: `Is post mein ${t} ko ${tone} style mein dikhaya gaya hai. ${safeTrendTerms.length ? "Related trend ideas: " + safeTrendTerms.join(", ") + ". " : ""}Pasand aaye toh save, share aur apni thoughts comments mein batao.`,
    english: `A ${tone}-style post about ${t}. ${safeTrendTerms.length ? "Related search trends: " + safeTrendTerms.join(", ") + ". " : ""}Save, share, and tell me what you think in the comments.`,
    hindi: `इस पोस्ट में ${t} को ${tone} अंदाज़ में दिखाया गया है। ${safeTrendTerms.length ? "संबंधित ट्रेंड: " + safeTrendTerms.join(", ") + "। " : ""}पसंद आए तो सेव और शेयर करें और अपनी राय कमेंट में बताएं।`
  };
  return { caption, hashtags, keywords, description: descriptions[language] || descriptions.hinglish };
}
function setStatus(msg) { $("status").textContent = msg; }
$("generate").addEventListener("click", () => {
  const topic = cleanTopic();
  if (selectedTrendTerms.length && topic !== selectedTrendTerms[0]) selectedTrendTerms = [];
  const result = buildContent(topic, $("language").value, $("tone").value, selectedTrendTerms);
  for (const [key,value] of Object.entries(result)) $(key).value = value;
  setStatus("Generated locally ✓");
});

let selectedTrendTerms = [];
$("loadTrends").addEventListener("click", async () => {
  const wrap = $("trends");
  wrap.innerHTML = '<p class="muted">Loading current India search trends…</p>';
  try {
    const response = await fetch("https://trends.google.com/trending/rss?geo=IN", {cache:"no-store"});
    if (!response.ok) throw new Error("Trends feed unavailable");
    const xmlText = await response.text();
    const xml = new DOMParser().parseFromString(xmlText, "text/xml");
    const items = Array.from(xml.querySelectorAll("item")).slice(0, 10);
    const names = items.map(item => (item.querySelector("title")?.textContent || "").trim()).filter(Boolean);
    if (!names.length) throw new Error("No trend items returned");
    wrap.innerHTML = "";
    names.forEach((name, index) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "trend-item";
      const rank = document.createElement("span"); rank.className = "trend-rank"; rank.textContent = String(index + 1).padStart(2, "0");
      const label = document.createElement("span"); label.className = "trend-name"; label.textContent = name;
      const use = document.createElement("span"); use.className = "trend-use"; use.textContent = "Use topic ↗";
      row.append(rank, label, use);
      row.addEventListener("click", () => {
        $("topic").value = name;
        selectedTrendTerms = [name];
        setStatus("Trend topic selected ✓");
      });
      wrap.appendChild(row);
    });
    setStatus("Trends loaded ✓");
  } catch (error) {
    wrap.innerHTML = '<p class="muted">Could not load live trends right now. Check your internet and try again. You can still generate content from your own topic.</p>';
  }
});

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const area = document.createElement("textarea"); area.value = text; document.body.appendChild(area); area.select();
    const ok = document.execCommand("copy"); area.remove(); return ok;
  }
}
document.querySelectorAll("[data-copy]").forEach(btn => btn.addEventListener("click", async () => {
  const id = btn.dataset.copy;
  const ok = await copyText($(id).value);
  btn.textContent = ok ? "Copied ✓" : "Select & copy";
  setTimeout(() => btn.textContent = "Copy", 1200);
}));
$("copyAll").addEventListener("click", async () => {
  const text = ["CAPTION", $("caption").value, "", "HASHTAGS", $("hashtags").value, "", "KEYWORDS", $("keywords").value, "", "DESCRIPTION", $("description").value].join("\n");
  const ok = await copyText(text);
  $("copyAll").textContent = ok ? "Copied all ✓" : "Copy failed";
  setTimeout(() => $("copyAll").textContent = "Copy all content", 1200);
});


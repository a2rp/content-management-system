export const contentStatuses = ["Draft", "In review", "Scheduled", "Published", "Changes requested"];

export const contentTypes = ["Journal story", "Brand note", "Email", "Social post", "Product page"];

export const initialStories = [
  {
    id: "MOR-1084",
    title: "The quiet craft of a handwritten note",
    excerpt: "A few deliberate words can turn an ordinary delivery into a keepsake.",
    type: "Journal story",
    status: "In review",
    author: "Anika Rao",
    date: "2026-10-14",
    body: "A note does not need a grand occasion. Start with what you noticed, choose a paper that feels good in the hand, and leave enough room for the words to breathe. We visited the makers at North Coast Press to see how a small ritual can bring a little more care to an ordinary day.",
    reviewNote: "",
    updated: "Today, 10:42 AM",
  },
  {
    id: "MOR-1083",
    title: "Five small rituals for a slower morning",
    excerpt: "Gentle ideas for making space before the day starts asking for it.",
    type: "Journal story",
    status: "Scheduled",
    author: "Mara Ellis",
    date: "2026-10-15",
    body: "A slower morning is not about adding more to the routine. It is about giving one small thing your full attention: open a window, make tea, write down a thought, or take the long route to the bakery. These rituals are invitations, not rules.",
    reviewNote: "",
    updated: "Yesterday, 4:10 PM",
  },
  {
    id: "MOR-1082",
    title: "A studio visit with North Coast Press",
    excerpt: "Inside the neighborhood print shop keeping letterpress alive.",
    type: "Journal story",
    status: "Draft",
    author: "Anika Rao",
    date: "2026-10-19",
    body: "The first thing you notice at North Coast Press is the sound. The slow, sure rhythm of the press sets a pace that invites you to stay awhile. We spent an afternoon with the small team making cards, notebooks, and everything in between.",
    reviewNote: "",
    updated: "Yesterday, 1:28 PM",
  },
  {
    id: "MOR-1081",
    title: "Make room for the in-between",
    excerpt: "A note on the days that are not quite a beginning or an ending.",
    type: "Brand note",
    status: "Published",
    author: "Mara Ellis",
    date: "2026-10-12",
    body: "Some of the best ideas arrive between plans. We are learning to leave a little unclaimed space in the week, on the desk, and in the notebook. It is a small practice in paying attention to what comes next.",
    reviewNote: "",
    updated: "Oct 12, 9:15 AM",
  },
  {
    id: "MOR-1080",
    title: "The autumn collection, gathered slowly",
    excerpt: "A first look at warm paper, familiar shapes, and new colors.",
    type: "Email",
    status: "In review",
    author: "Sofia Bennett",
    date: "2026-10-17",
    body: "This season brings together soft rust, evergreen, and the paper tones we keep coming back to. Meet the new desk set, find a few favorite notebooks, and see what our makers have been working on through the summer.",
    reviewNote: "",
    updated: "Oct 11, 3:06 PM",
  },
  {
    id: "MOR-1079",
    title: "A page for the things you want to remember",
    excerpt: "Introducing the Field Notes journal in recycled cotton paper.",
    type: "Product page",
    status: "Published",
    author: "Sofia Bennett",
    date: "2026-10-09",
    body: "A cloth-bound journal with 160 pages of warm, uncoated paper. Made in small batches with recycled cotton fibers and stitched to lie flat as you write.",
    reviewNote: "",
    updated: "Oct 9, 11:32 AM",
  },
  {
    id: "MOR-1078",
    title: "A small reminder to make something",
    excerpt: "A short social note for the first cool weekend of the season.",
    type: "Social post",
    status: "Changes requested",
    author: "Anika Rao",
    date: "2026-10-18",
    body: "Make a little something this weekend. It does not need to be finished, useful, or shared. It only needs to be yours for a while.",
    reviewNote: "Can we make the opening line more specific to the workshop?",
    updated: "Oct 8, 2:20 PM",
  },
  {
    id: "MOR-1077",
    title: "What we keep on the writing table",
    excerpt: "Pens, paper, and the tools we reach for most often.",
    type: "Journal story",
    status: "Draft",
    author: "Mara Ellis",
    date: "2026-10-21",
    body: "A good writing table is a personal thing. Ours has a jar of sharpened pencils, a stack of scrap paper, and one notebook that is always open. Here are a few more things we keep close.",
    reviewNote: "",
    updated: "Oct 7, 5:04 PM",
  },
];

export const formatDate = (value, options = { month: "short", day: "numeric" }) => {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? "No date" : date.toLocaleDateString("en-US", options);
};

export const formatMonth = (value) => formatDate(value, { month: "long", year: "numeric" });

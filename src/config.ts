import { AppConfig } from './types';

/**
 * ====================================================================
 * EDITABLE CONFIGURATION FOR SANA'S WEBSITE
 * You can edit any text, photo URLs, letter content, and date choices here!
 * ====================================================================
 */
export const defaultConfig: AppConfig = {
  girlfriendName: "Sana",
  nickname: "My Cutie",
  boyfriendName: "Your Love",
  subtitleMessage: "To the most amazing girl who makes my world bright and beautiful :)",
  
  // Opening envelope text
  envelopeTitle: "Hey Sana!",
  envelopeSubtitle: "I made a little surprise bouquet just for you...",

  // Bouquet reveal screen text
  bouquetHeading: "Happy Girlfriend Day, Sana! 💖",
  bouquetSubheading: "Because you love lilies, here is a special pink & blue bouquet that blooms forever just for you!",

  // Love Letter content
  letterTitle: "A Note For You 💌",
  letterSubtitle: "Something I want you to always remember...",
  letterBody: `My Dearest Sana,

Happy Girlfriend Day! Every single day with you feels like a beautiful dream filled with warmth and joy. Your gentle smile, your lovely laughter, and the soft grace you bring into my life mean everything to me.

Just like the pink and blue lilies you adore, you bring vivid color, sweetness, and peace to my world. You are not just my girlfriend—you are my best friend, my safe place, and my favorite person to talk to about everything.

Thank you for being you, for caring so tenderly, and for making my heart swell with love every single day.

Forever and always, yours.`,
  letterClosing: "Always & Forever 💕",

  // Special Instagram Reel Edit
  reelUrl: "https://www.instagram.com/reel/",
  reelVideoUrl: "",
  reelCaption: "A special Instagram reel edit made with all my love for my Sana! 💖✨ Every second with you is my favorite memory.",
  reelAudioTrack: "Original Audio — Vaibhav x Sana 💕",

  // Background Romantic Music (Direct MP3 URL)
  musicUrl: "https://intelligent-jade-izjvhzrk.edgeone.dev",
  musicTitle: "Tum Se Hi 💕",

  // Photos for Reel Slideshow / Gallery
  memories: [
    {
      id: "mem-1",
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      title: "Our Sweet Laughs",
      date: "First Coffee Together",
      note: "The moment you smiled over your coffee, my whole heart melted."
    },
    {
      id: "mem-2",
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      title: "Hand in Hand Walk",
      date: "Evening Stroll",
      note: "Walking beside you, listening to you talk about your favorite things."
    },
    {
      id: "mem-3",
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      title: "Unforgettable Sunset",
      date: "Beach Sunset",
      note: "The golden sky was gorgeous, but my eyes were only on you."
    },
    {
      id: "mem-4",
      url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      title: "Lily Garden Day",
      date: "Flower Market Trip",
      note: "Seeing your eyes light up when you saw the pink & blue lilies!"
    },
    {
      id: "mem-5",
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      title: "Cozy Memories",
      date: "Late Night Talks",
      note: "Hours felt like minutes whenever we lost track of time together."
    }
  ],

  // Battery Scratch Cards
  scratchCards: [
    {
      id: "card-1",
      title: "Without You",
      percentage: 0,
      batteryText: "0%",
      message: "Feeling lost, gloomy, and missing my favorite person...",
      color: "from-rose-100 to-pink-200"
    },
    {
      id: "card-2",
      title: "When I Talk To You",
      percentage: 50,
      batteryText: "50%",
      message: "It feels like i am so so so happy",
      color: "from-amber-100 to-amber-200"
    },
    {
      id: "card-3",
      title: "When I Will See You",
      percentage: 100,
      batteryText: "100%",
      message: "you will complete me",
      color: "from-emerald-100 to-teal-200"
    }
  ],

  // Date Activities Options for Sana to pick
  dateActivities: [
    {
      id: "act-1",
      title: "Candlelight Dinner",
      iconName: "Utensils",
      description: "A cozy romantic dinner with soft music and sweet dessert"
    },
    {
      id: "act-2",
      title: "Lily Garden Picnic",
      iconName: "Flower2",
      description: "Handmade snacks, fresh juices, surrounded by pink & blue blooms"
    },
    {
      id: "act-3",
      title: "Stargazing & Late Drive",
      iconName: "Sparkles",
      description: "Night drive playing our favorite playlist and watching stars"
    },
    {
      id: "act-4",
      title: "Fun Arcade & Ice Cream",
      iconName: "Gamepad2",
      description: "Winning cute plushies for you followed by giant ice cream scoops"
    }
  ],

  // Locations Options
  romanticLocations: [
    {
      id: "loc-1",
      title: "Rooftop Restaurant",
      iconName: "Building",
      description: "City skyline view under twinkling fairy lights"
    },
    {
      id: "loc-2",
      title: "Botanical Lily Park",
      iconName: "Trees",
      description: "Serene nature walk with lily ponds"
    },
    {
      id: "loc-3",
      title: "Cozy Beach Side",
      iconName: "Waves",
      description: "Listening to ocean waves under sunset colors"
    },
    {
      id: "loc-4",
      title: "Cute Vintage Cafe",
      iconName: "Coffee",
      description: "Warm pastel vibe with cozy corner booths"
    }
  ],

  // Food / Treats Choices
  foodChoices: [
    {
      id: "food-1",
      title: "Italian Pasta & Pizza",
      iconName: "Pizza",
      description: "Cheesy pasta & wood-fired garlic pizza"
    },
    {
      id: "food-2",
      title: "Sushi & Asian Delights",
      iconName: "Fish",
      description: "Fresh dumplings, ramen & sushi rolls"
    },
    {
      id: "food-3",
      title: "Pastry & Pancakes Heaven",
      iconName: "Cake",
      description: "Fluffy pancakes, berries, and french macarons"
    },
    {
      id: "food-4",
      title: "Street Food Crawl",
      iconName: "UtensilsCrossed",
      description: "Trying all our favorite spicy & sweet treats"
    }
  ]
};

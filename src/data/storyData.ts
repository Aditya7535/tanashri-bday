/**
 * ==============================================================================
 * STORY DATA & CONFIGURATION
 * ==============================================================================
 * All text, chapter labels, photo paths, and easter egg messages are stored here.
 * To replace photos, audio, or text with personal assets, edit this file.
 * ==============================================================================
 */

export interface PhotoConfig {
  id: string;
  src?: string; // Set to actual photo path, e.g. "/photos/first_time.jpg"
  alt: string;
  caption?: string;
  orientation: 'portrait' | 'landscape' | 'square';
  placeholderTitle?: string;
  placeholderSubtitle?: string;
}

export interface ChapterAudioConfig {
  id: number;
  chapterTitle: string;
  songTitle: string;
  artist?: string;
  filePath: string;
}

export interface StoryContent {
  recipient: {
    fullName: string;
    nicknames: string[];
  };
  audio: {
    filePath?: string;
    title: string;
  };
  chapterAudios: ChapterAudioConfig[];
  chapters: {
    screen01: {
      title: string;
      subtitle: string;
      scrollCue: string;
    };
    screen02: {
      chapterNumber: string;
      chapterTitle: string;
      heading: string;
      eventLabel: string;
      photo: PhotoConfig;
      storyLines: string[];
      easterEgg: string;
    };
    screen03: {
      chapterNumber: string;
      chapterTitle: string;
      heading: string;
      storyLines: string[];
      handwrittenNote: string;
      video?: {
        src: string;
        fallbackSrc?: string;
        caption?: string;
      };
    };
    screen04: {
      chapterNumber: string;
      chapterTitle: string;
      sequence: string[];
      icon: string;
      resolution: string[];
      easterEgg: string;
    };
    screen05: {
      chapterNumber: string;
      chapterTitle: string;
      heading: string;
      subHeading: string;
      photo?: PhotoConfig;
      notification: {
        app: string;
        user: string;
        action: string;
        time: string;
      };
      aftermath: string[];
      easterEgg: string;
    };
    screen06: {
      chapterNumber: string;
      chapterTitle: string;
      heading: string;
      chatMessages: Array<{
        sender: 'me' | 'her';
        text: string;
      }>;
      video?: {
        src: string;
        caption?: string;
      };
      turningPoint: {
        lead: string;
        climax: string;
      };
    };
    screen07: {
      chapterNumber: string;
      chapterTitle: string;
      heading: string;
      photos: {
        flowers: PhotoConfig;
        chocolate: PhotoConfig;
        outingPhoto: PhotoConfig;
      };
      storyIntro: string[];
      secretNote: {
        teaser: string;
        note: string;
      };
      storyEnding: string[];
    };
    screen08: {
      chapterNumber: string;
      chapterTitle: string;
      heading: string;
      leadText: string[];
      awkwardness: string[];
      fadeWords: string[];
    };
    screen09: {
      chapterNumber: string;
      chapterTitle: string;
      monolith: string;
      leadText: string;
      storyLines: string[];
    };
    screen10: {
      chapterNumber: string;
      chapterTitle: string;
      timer: {
        months: string;
        days: string;
        hours: string;
      };
      storyLines: string[];
      resolution: string[];
    };
    screen11: {
      chapterNumber: string;
      chapterTitle: string;
      heading: string;
      letter: string[];
      emphasis: string;
    };
    screen12: {
      heading: string;
      names: string[];
      conclusion: string;
    };
    screenVoiceNote: {
      chapterNumber: string;
      chapterTitle: string;
      heading: string;
      subtitle: string;
      audioSrc: string;
      audioOggSrc?: string;
      duration: string;
      dateLabel: string;
      storyLines: string[];
      handwrittenThought: string;
      easterEgg: string;
    };
    screen13: {
      quotes: string[];
      birthdayWish: string;
      handwrittenSignoff: string;
      finalWhisper?: string;
    };
  };
}

export const storyData: StoryContent = {
  recipient: {
    fullName: 'Tanashri',
    nicknames: ['Shree', 'Radha'],
  },

  audio: {
    filePath: '/audio/00_intro.mp3',
    title: 'Earrings • Malcolm Todd',
  },

  // Continuous soundtrack across the whole website:
  chapterAudios: [
    { id: 0, chapterTitle: 'Introduction', songTitle: 'Earrings • Malcolm Todd', filePath: '/audio/00_intro.mp3' },
    { id: 1, chapterTitle: 'The First Time', songTitle: 'Earrings • Malcolm Todd', filePath: '/audio/00_intro.mp3' },
    { id: 2, chapterTitle: 'Atrangi', songTitle: 'Earrings • Malcolm Todd', filePath: '/audio/00_intro.mp3' },
    { id: 3, chapterTitle: 'Eye Contact', songTitle: 'Earrings • Malcolm Todd', filePath: '/audio/00_intro.mp3' },
    { id: 4, chapterTitle: 'Lohri', songTitle: 'Earrings • Malcolm Todd', filePath: '/audio/00_intro.mp3' },
    { id: 5, chapterTitle: 'Dhoom Chitar', songTitle: 'Earrings • Malcolm Todd', filePath: '/audio/00_intro.mp3' },
    { id: 6, chapterTitle: 'The Flowers', songTitle: 'Earrings • Malcolm Todd', filePath: '/audio/00_intro.mp3' },
    { id: 7, chapterTitle: 'The Canteen', songTitle: 'Earrings • Malcolm Todd', filePath: '/audio/00_intro.mp3' },
    { id: 8, chapterTitle: 'The Silence', songTitle: 'Earrings • Malcolm Todd', filePath: '/audio/00_intro.mp3' },
    { id: 9, chapterTitle: 'The Call', songTitle: 'Earrings • Malcolm Todd', filePath: '/audio/00_intro.mp3' },
    { id: 10, chapterTitle: 'To Know', songTitle: 'Earrings • Malcolm Todd', filePath: '/audio/00_intro.mp3' },
    { id: 11, chapterTitle: 'Birthday', songTitle: 'Earrings • Malcolm Todd', filePath: '/audio/00_intro.mp3' },
    { id: 12, chapterTitle: 'From Me To You', songTitle: 'Earrings • Malcolm Todd', filePath: '/audio/00_intro.mp3' },
    { id: 13, chapterTitle: 'End', songTitle: 'Earrings • Malcolm Todd', filePath: '/audio/00_intro.mp3' },
  ],

  chapters: {
    // ----------------------------------------------------
    // SCREEN 01 — INTRO
    // ----------------------------------------------------
    screen01: {
      title: 'TANASHRI',
      subtitle: 'A little story about you.',
      scrollCue: 'Tap to begin →',
    },

    // ----------------------------------------------------
    // SCREEN 02 — THE FIRST TIME
    // ----------------------------------------------------
    screen02: {
      chapterNumber: '01',
      chapterTitle: 'THE FIRST TIME',
      heading: 'The first time I noticed you.',
      eventLabel: 'Ganesh Utsav',
      // To replace with real photo:
      // Change src to "/photos/ganesh_utsav.jpg"
      photo: {
        id: 'first-time-photo',
        src: '/photos/first_time.jpg?v=2',
        alt: 'Tanashri',
        caption: 'Not from that exact day, but still one of my favorites',
        orientation: 'portrait',
        placeholderTitle: 'The Girl in Blue',
        placeholderSubtitle: 'Ganesh Utsav • Silver-box kurti',
      },
      storyLines: [
        'You were wearing blue.',
        'A silver-box patterned kurti.',
        "I didn't know your name.",
        "I didn't know we'd ever talk.",
        'I just noticed you.',
      ],
      easterEgg: "No camera captured that moment, but the memory stayed with me.",
    },

    // ----------------------------------------------------
    // SCREEN 03 — ATRANGI
    // ----------------------------------------------------
    screen03: {
      chapterNumber: '02',
      chapterTitle: 'ATRANGI',
      heading: 'Then life brought us to Atrangi.',
      video: {
        src: '/videos/atrangi.mp4',
        caption: 'Atrangi • The craft & cutting days',
      },
      storyLines: [
        "That's where we were finally introduced.",
        'And somehow, I ended up learning craft and cutting from you.',
        "It wasn't exactly easy for me...",
        'but I managed.',
      ],
      handwrittenNote: 'still don’t know how I survived that 😭',
    },

    // ----------------------------------------------------
    // SCREEN 04 — EYE CONTACT
    // ----------------------------------------------------
    screen04: {
      chapterNumber: '03',
      chapterTitle: 'EYE CONTACT',
      sequence: [
        'look.',
        'pause',
        'look away.',
        'pause',
        'look again.',
        'pause',
        'pretend nothing happened.',
      ],
      icon: '👀',
      resolution: ['Yeah...', 'we both know.'],
      easterEgg: 'Okay, stop looking at me 😂',
    },

    // ----------------------------------------------------
    // SCREEN 05 — LOHRI
    // ----------------------------------------------------
    screen05: {
      chapterNumber: '04',
      chapterTitle: 'LOHRI',
      heading: 'We met again.',
      subHeading: 'And later that night...',
      photo: {
        id: 'lohri-photo',
        src: '/photos/lohri.jpg',
        alt: 'Lohri night with Tanashri',
        caption: 'Lohri night • The day of eye contact',
        orientation: 'portrait',
      },
      notification: {
        app: 'Instagram',
        user: 'tanashri',
        action: 'started following you.',
        time: '11:42 PM',
      },
      aftermath: [
        'I saw it the next morning.',
        'And suddenly...',
        '“Hi”',
        'became the hardest message to type.',
      ],
      easterEgg: 'And yes, I stared at this notification for an embarrassingly long time.',
    },

    // ----------------------------------------------------
    // SCREEN 06 — DHOOM CHITAR
    // ----------------------------------------------------
    screen06: {
      chapterNumber: '05',
      chapterTitle: 'DHOOM CHITAR',
      heading: 'Finally, I had a reason to text you.',
      chatMessages: [
        { sender: 'me', text: 'Are you participating in Chitra Dhoom?' },
        { sender: 'her', text: 'No.' },
        { sender: 'me', text: "I'm going solo." },
        { sender: 'her', text: "I'll help you." },
      ],
      video: {
        src: '/videos/chitra_dhoom.mp4',
        caption: 'Chitra Dhoom • Where you kept your word',
      },
      turningPoint: {
        lead: 'And somewhere around here...',
        climax: 'I started falling for you.',
      },
    },

    // ----------------------------------------------------
    // SCREEN 07 — THE FLOWERS
    // ----------------------------------------------------
    screen07: {
      chapterNumber: '06',
      chapterTitle: 'THE FLOWERS',
      heading: 'Your outing day.',
      photos: {
        flowers: {
          id: 'flowers-photo',
          src: '/photos/flowers.jpg',
          alt: 'The flowers for Tanashri',
          caption: 'The flowers • Cancelled everything just to see your smile',
          orientation: 'portrait',
          placeholderTitle: 'The Flowers',
          placeholderSubtitle: 'Picked just for you',
        },
        chocolate: {
          id: 'chocolate-photo',
          src: '/photos/chocolate.jpg',
          alt: 'Chocolate bowl for Tanashri',
          caption: 'Chocolate bowl • Sweet pauses together',
          orientation: 'square',
          placeholderTitle: 'Chocolate Bowl',
          placeholderSubtitle: 'Sweet pauses',
        },
        outingPhoto: {
          id: 'outing-photo',
          src: '', // REPLACE: e.g. "/photos/outing.jpg"
          alt: 'A small personal photograph',
          orientation: 'landscape',
          placeholderTitle: 'That Afternoon',
          placeholderSubtitle: 'Unplanned, unhurried',
        },
      },
      storyIntro: [
        'My schedule was packed.',
        'Meetings.',
        'Professors.',
        'Everything.',
        'But I cancelled it all.',
        'Just to see you.',
      ],
      secretNote: {
        teaser: 'A secret note tucked with the flowers...',
        note: "I ran all the way so the flowers wouldn't wilt before you saw them... and I’d cancel a hundred more meetings just to see that smile again.",
      },
      storyEnding: [
        'Flowers.',
        'Chocolate.',
        'A few minutes together.',
        'And your smile made it worth it.',
      ],
    },

    // ----------------------------------------------------
    // SCREEN 08 — THE CANTEEN
    // ----------------------------------------------------
    screen08: {
      chapterNumber: '07',
      chapterTitle: 'THE CANTEEN',
      heading: 'Then came a conversation I didn’t expect.',
      leadText: [
        'I got your attendance.',
        'Got you out of class.',
        'And we went to the canteen.',
      ],
      awkwardness: [
        'You told me you felt like you were using me.',
        "I didn't really know what to say.",
        'Things became awkward.',
      ],
      fadeWords: ['Ghosting.', 'Ego.', 'Silence.'],
    },

    // ----------------------------------------------------
    // SCREEN 09 — THE SILENCE
    // ----------------------------------------------------
    screen09: {
      chapterNumber: '08',
      chapterTitle: 'THE SILENCE',
      monolith: '2 MONTHS',
      leadText: 'I disappeared.',
      storyLines: [
        'No texts.',
        'No calls.',
        'No conversations.',
        'Just silence.',
      ],
    },

    // ----------------------------------------------------
    // SCREEN 10 — THE CALL
    // ----------------------------------------------------
    screen10: {
      chapterNumber: '09',
      chapterTitle: 'THE CALL',
      timer: {
        months: '3 MONTHS',
        days: '17 DAYS',
        hours: '16 HOURS',
      },
      storyLines: [
        "That's how long it had been.",
        'And then, before my capstone presentation...',
        'I called you.',
        'We talked again.',
      ],
      resolution: [
        "Maybe the story didn't go back to where it was.",
        'Maybe it simply started again.',
      ],
    },

    // ----------------------------------------------------
    // SCREEN 11 — WHAT I WANT YOU TO KNOW
    // ----------------------------------------------------
    screen11: {
      chapterNumber: '10',
      chapterTitle: 'SOMETHING I WANT YOU TO KNOW',
      heading: "There's something I want you to know.",
      letter: [
        'I know you have your fears.',
        'I know your past has made you careful.',
        "And I don't want this to be something you have to figure out.",
        "I don't want an answer.",
        'I just wanted you to know...',
      ],
      emphasis: 'somewhere along the way,\nyou became someone really special to me.',
    },

    // ----------------------------------------------------
    // SCREEN 12 — BIRTHDAY
    // ----------------------------------------------------
    screen12: {
      heading: 'HAPPY BIRTHDAY',
      names: ['Tanashri', 'Shree.', 'Radha.'],
      conclusion: "Whatever name you answer to...\nI'm just glad I got to know you.",
    },

    // ----------------------------------------------------
    // SCREEN VOICE NOTE — FROM ME TO YOU
    // ----------------------------------------------------
    screenVoiceNote: {
      chapterNumber: '12',
      chapterTitle: 'FROM ME TO YOU',
      heading: 'A voice note for you.',
      subtitle: 'Because some feelings are meant to be heard, not just read.',
      audioSrc: '/audio/voice_note.mp3',
      audioOggSrc: '/audio/voice_note.ogg',
      duration: '01:33',
      dateLabel: 'Voice Note • 10:25 PM',
      storyLines: [
        'There are things that texts could never fully say.',
        'How much I’ve been missing you.',
        'How quiet every single day feels without you.',
        'So I recorded this... just for you.',
      ],
      handwrittenThought: 'Missing you so much... more than I can ever explain.',
      easterEgg: 'I really, truly miss you so much.',
    },

    // ----------------------------------------------------
    // SCREEN 13 — FINAL MESSAGE
    // ----------------------------------------------------
    screen13: {
      quotes: [
        'Some people enter your life quietly.',
        'Somehow...',
        'they become part of your favorite memories.',
      ],
      birthdayWish: 'Happy Birthday, Shree.',
      handwrittenSignoff: '— from someone who still remembers the girl in blue.',
      finalWhisper: 'Missing you so much... and come fast.',
    },
  },
};

export type CardType = 'verse' | 'encouragement' | 'question' | 'action' | 'complete';

export interface DevotionalCard {
  type: CardType;
  content?: string;
  question?: string;
}

export interface DevotionalDay {
  day: number;
  title: string;
  cards: DevotionalCard[];
}

export interface DevotionalTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  days: DevotionalDay[];
}

export const DEVOTIONAL_TOPICS: DevotionalTopic[] = [
  {
    id: 'purity',
    title: 'Purity',
    description: 'Navigating temptations and keeping your mind and heart clean.',
    icon: 'shield',
    days: [
      {
        day: 1,
        title: "Why Purity Matters",
        cards: [
          { type: "verse", content: "\"Blessed are the pure in heart, for they will see God.\"\n\n-- Matthew 5:8" },
          { type: "encouragement", content: "Jesus didn't say \"blessed are the rule-followers\" or \"blessed are the ones who white-knuckle their way through temptation.\" He said blessed are the pure in heart. This is about the inside -- who you are when no one is watching. And the reward isn't a trophy or a pat on the back. It's God Himself. Purity isn't a list of things you don't do. It's a heart that wants Jesus more than anything else." },
          { type: "question", question: "When you think about purity, does it feel like a burden or a gift? Why?" },
          { type: "question", question: "What would it look like for your heart -- not just your actions -- to be pure?" },
          { type: "question", question: "Is there something in your life right now competing with Jesus for first place?" },
          { type: "action", content: "Unfollow one account or delete one app today that you know pulls your heart away from Christ." },
          { type: "complete" },
        ],
      },
      {
        day: 2,
        title: "The Trap of Lust",
        cards: [
          { type: "verse", content: "\"But I tell you that anyone who looks at a woman lustfully has already committed adultery with her in his heart.\"\n\n-- Matthew 5:28" },
          { type: "encouragement", content: "Jesus didn't soften this. He went straight to the heart. Lust isn't just a physical problem -- it's a worship problem. When you lust, you're treating another person as an object for your pleasure instead of an image-bearer of God. And here's what Piper says that cuts deep: lust is a failure to treasure Christ above all things. The battle for purity is won or lost in what you treasure. Jesus is better than anything lust promises." },
          { type: "question", question: "When are you most vulnerable to temptation -- what time, place, or emotional state?" },
          { type: "question", question: "How does giving in to lust affect your relationship with God and with others?" },
          { type: "question", question: "Who is someone you trust enough to be honest with about this struggle?" },
          { type: "action", content: "Set one physical boundary today -- like keeping your phone out of your bedroom at night. Tell someone about it." },
          { type: "complete" },
        ],
      },
      {
        day: 3,
        title: "Flee -- Don't Fight",
        cards: [
          { type: "verse", content: "\"Flee from sexual immorality. All other sins a person commits are outside the body, but whoever sins sexually, sins against their own body. Do you not know that your bodies are temples of the Holy Spirit?\"\n\n-- 1 Corinthians 6:18-19" },
          { type: "encouragement", content: "Paul doesn't say fight it. He says flee. There's a reason for that. Some battles aren't won by standing your ground -- they're won by running. And notice why: your body is a temple of the Holy Spirit. Jesus bought you with His blood. You belong to Him. That changes everything. You're not just trying to be a good person. You're honoring the God who lives in you." },
          { type: "question", question: "What is a situation you need to \"flee\" from right now, not just manage?" },
          { type: "question", question: "How does knowing the Holy Spirit lives in you change how you see your body and your choices?" },
          { type: "question", question: "What is your escape plan for the next time you are tempted?" },
          { type: "action", content: "Write down your escape plan for your most common temptation. Be specific. Put it somewhere you'll see it." },
          { type: "complete" },
        ],
      },
      {
        day: 4,
        title: "Renew Your Mind",
        cards: [
          { type: "verse", content: "\"Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is -- his good, pleasing and perfect will.\"\n\n-- Romans 12:2" },
          { type: "encouragement", content: "You can't just empty your mind of junk and expect it to stay clean. You have to replace it with something better. The world is constantly feeding you a vision of what a man is -- and it's a lie. Jesus offers a different vision: a man who is strong enough to be self-controlled, secure enough to not need approval, and free enough to love others without using them. That vision only gets into your head through the Word. Fill your mind with truth, and the lies lose their grip." },
          { type: "question", question: "What is the world's version of manhood telling you about sex and purity?" },
          { type: "question", question: "What truth from Scripture do you need to replace that lie with?" },
          { type: "question", question: "How much time are you spending in the Word compared to screens this week?" },
          { type: "action", content: "Spend 10 minutes today reading Scripture or a solid Christian book instead of scrolling. Start the habit." },
          { type: "complete" },
        ],
      },
      {
        day: 5,
        title: "Grace for the Failure",
        cards: [
          { type: "verse", content: "\"If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.\"\n\n-- 1 John 1:9" },
          { type: "encouragement", content: "You will fail. That's not an excuse -- it's the truth. And when you do, the enemy will tell you that you're too far gone, that God is done with you, that you might as well give up. Don't believe him. Jesus went to the cross knowing every sin you would ever commit -- including the ones you're most ashamed of. His blood is enough. Confession isn't crawling back to God in defeat. It's running back to a Father who already sees you coming and is ready to restore you. Get up. Keep going." },
          { type: "question", question: "Is there a failure you're still carrying shame over that you haven't brought to Jesus?" },
          { type: "question", question: "Why is it sometimes harder to accept forgiveness than to earn it?" },
          { type: "question", question: "How does the gospel -- Jesus dying for your sin -- change how you respond to failure?" },
          { type: "action", content: "Take a moment right now to confess a recent failure out loud or in writing. Then read 1 John 1:9 again and receive it. Stand up as a physical act of moving forward." },
          { type: "complete" },
        ],
      },
    ],
  },
  {
    id: 'strength',
    title: 'True Strength',
    description: 'Redefining what it means to be a strong man.',
    icon: 'fitness-center',
    days: [
      {
        day: 1,
        title: 'Strength Under Control',
        cards: [
          {
            type: 'verse',
            content: '"Better a patient person than a warrior, one with self-control than one who takes a city."\n\n— Proverbs 16:32',
          },
          {
            type: 'encouragement',
            content: 'Real strength isn\'t about how much you can lift or how loud you can yell. It\'s about self-control. A man who can\'t control his temper is weak, no matter his physical size. True power is having strength but keeping it under control.',
          },
          { type: 'question', question: 'When was the last time you lost your temper?' },
          { type: 'question', question: 'What triggers you to lose control of your emotions?' },
          { type: 'question', question: 'How can you practice patience in a frustrating situation today?' },
          {
            type: 'action',
            content: 'The next time you feel angry today, take a deep breath and count to 5 before responding.',
          },
          { type: 'complete' },
        ],
      },
      {
        day: 2,
        title: 'Protecting the Weak',
        cards: [
          {
            type: 'verse',
            content: '"Speak up for those who cannot speak for themselves, for the rights of all who are destitute."\n\n— Proverbs 31:8',
          },
          {
            type: 'encouragement',
            content: 'You were given strength for a reason: to protect those who are weaker. Whether it\'s standing up to a bully, helping someone who is struggling, or just being a safe presence — use your strength to build others up, not tear them down.',
          },
          { type: 'question', question: 'Who is someone in your life that might need protection or an advocate?' },
          { type: 'question', question: 'Have you ever used your strength or influence to put someone else down?' },
          { type: 'question', question: 'What does it look like to be a "safe presence" for others?' },
          {
            type: 'action',
            content: 'Find one way to help or stand up for someone else today, even in a small way.',
          },
          { type: 'complete' },
        ],
      },
      {
        day: 3,
        title: 'The Courage to Stand Alone',
        cards: [
          {
            type: 'verse',
            content: '"Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."\n\n— Joshua 1:9',
          },
          {
            type: 'encouragement',
            content: 'It takes zero effort to follow the crowd. It takes immense courage to stand alone for what is right. As a young man, you will face pressure to compromise your values to fit in. Courage is making the hard choice even when it costs you popularity.',
          },
          { type: 'question', question: 'When is a time you felt pressured to go along with the crowd?' },
          { type: 'question', question: 'What is a core value you refuse to compromise on?' },
          { type: 'question', question: 'Where do you draw your courage from when you feel alone?' },
          {
            type: 'action',
            content: 'Identify one area where you\'ve been compromising to fit in, and make a decision to stand firm today.',
          },
          { type: 'complete' },
        ],
      },
      {
        day: 4,
        title: 'Endurance in the Grind',
        cards: [
          {
            type: 'verse',
            content: '"Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up."\n\n— Galatians 6:9',
          },
          {
            type: 'encouragement',
            content: 'Strength is often forged in the fires of endurance. It\'s not about a single moment of bravery, but the daily grind of not giving up. When you feel like quitting, push through. Character is built in the moments when you want to stop but choose to keep going.',
          },
          { type: 'question', question: 'What is something you feel like giving up on right now?' },
          { type: 'question', question: 'Why is endurance often harder than a single act of courage?' },
          { type: 'question', question: 'What is the "harvest" you\'re hoping for if you don\'t give up?' },
          {
            type: 'action',
            content: 'Commit to finishing one task today that you\'ve been putting off or wanting to quit.',
          },
          { type: 'complete' },
        ],
      },
      {
        day: 5,
        title: 'Admitting Weakness',
        cards: [
          {
            type: 'verse',
            content: '"But he said to me, \'My grace is sufficient for you, for my power is made perfect in weakness.\'"\n\n— 2 Corinthians 12:9',
          },
          {
            type: 'encouragement',
            content: 'The world says real men don\'t cry and don\'t need help. That\'s a lie. It takes a strong man to admit he is weak and needs help. Don\'t carry your burdens alone. Acknowledge your weaknesses so that true strength can work through you.',
          },
          { type: 'question', question: 'What is a weakness you try to hide from others?' },
          { type: 'question', question: 'Why is it so hard to ask for help?' },
          { type: 'question', question: 'Who is one person you can trust with your struggles?' },
          {
            type: 'action',
            content: 'Reach out to a mentor, parent, or trusted friend today and share one thing you\'re struggling with.',
          },
          { type: 'complete' },
        ],
      },
    ],
  },
  {
    id: 'identity',
    title: 'Identity',
    description: 'Figure out who you are and what you were made for.',
    icon: 'person',
    days: [
      {
        day: 1,
        title: 'More Than Your Achievements',
        cards: [
          {
            type: 'verse',
            content: '"For we are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do."\n\n— Ephesians 2:10',
          },
          {
            type: 'encouragement',
            content: 'Society will tell you that your worth is tied to your grades, your athletic performance, or your popularity. That is a lie. Your identity is rooted in who you are, not what you do. You have inherent value simply because you exist. Rest in that truth today.',
          },
          { type: 'question', question: 'Where do you most often look for your sense of worth or value?' },
          { type: 'question', question: 'How does it feel when you fail at something you tied your identity to?' },
          { type: 'question', question: 'What would change if you truly believed your value wasn\'t based on performance?' },
          {
            type: 'action',
            content: 'Write down three things about yourself that have nothing to do with what you achieve or how others see you.',
          },
          { type: 'complete' },
        ],
      },
      {
        day: 2,
        title: 'Forging Your Character',
        cards: [
          {
            type: 'verse',
            content: '"The integrity of the upright guides them, but the unfaithful are destroyed by their duplicity."\n\n— Proverbs 11:3',
          },
          {
            type: 'encouragement',
            content: 'Your reputation is what people think of you. Your character is who you are when no one is looking. Focus on building a character of integrity, honesty, and hard work. A strong character will carry you through storms that a good reputation cannot survive.',
          },
          { type: 'question', question: 'Is there a difference between who you are in public and who you are in private?' },
          { type: 'question', question: 'What is one character trait you want to be known for?' },
          { type: 'question', question: 'What is one habit you could build that would strengthen your character?' },
          {
            type: 'action',
            content: 'Do one thing today that you would do even if nobody was watching — just because it\'s the right thing.',
          },
          { type: 'complete' },
        ],
      },
      {
        day: 3,
        title: 'Discovering Your Calling',
        cards: [
          {
            type: 'verse',
            content: '"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."\n\n— Jeremiah 29:11',
          },
          {
            type: 'encouragement',
            content: 'You were not created to just consume resources and take up space. You have a unique purpose. Pay attention to the things that ignite your passion and the problems in the world that break your heart. Your calling is often found at the intersection of your gifts and the world\'s needs.',
          },
          { type: 'question', question: 'What activities make you lose track of time because you enjoy them so much?' },
          { type: 'question', question: 'What problems in the world make you angry or break your heart?' },
          { type: 'question', question: 'How might your unique gifts and passions be used to help others?' },
          {
            type: 'action',
            content: 'Spend 5 minutes writing down your top 3 strengths and 3 things you care deeply about.',
          },
          { type: 'complete' },
        ],
      },
      {
        day: 4,
        title: 'Rejecting False Labels',
        cards: [
          {
            type: 'verse',
            content: '"Do not let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity."\n\n— 1 Timothy 4:12',
          },
          {
            type: 'encouragement',
            content: 'People will try to put labels on you — lazy, angry, not smart enough, not athletic enough. Reject any label that doesn\'t align with your true identity. You have the power to define your own path. Tear off the false labels today and step into who you are meant to be.',
          },
          { type: 'question', question: 'What is a negative label someone has put on you that you\'ve started to believe?' },
          { type: 'question', question: 'Where did that label come from, and is it actually true?' },
          { type: 'question', question: 'What is the truth you want to replace that label with?' },
          {
            type: 'action',
            content: 'Write down one false label you\'ve been carrying and physically cross it out. Write the truth next to it.',
          },
          { type: 'complete' },
        ],
      },
      {
        day: 5,
        title: 'Living with Intention',
        cards: [
          {
            type: 'verse',
            content: '"So whether you eat or drink or whatever you do, do it all for the glory of God."\n\n— 1 Corinthians 10:31',
          },
          {
            type: 'encouragement',
            content: 'A purposeful life doesn\'t happen by accident. It requires intentional choices every single day. Stop drifting through life and start steering. Set goals, make a plan, and take action. Live today with purpose and intention.',
          },
          { type: 'question', question: 'Are you currently drifting through life or steering it? What\'s the difference?' },
          { type: 'question', question: 'What is one goal you have for the next 6 months?' },
          { type: 'question', question: 'What is one small step you can take today toward that goal?' },
          {
            type: 'action',
            content: 'Write down one goal and the first step to get there. Put it somewhere you\'ll see it every day.',
          },
          { type: 'complete' },
        ],
      },
    ],
  },
  {
    id: 'brotherhood',
    title: 'Brotherhood',
    description: 'The power of real friendships and accountability.',
    icon: 'group',
    days: [
      {
        day: 1,
        title: 'Iron Sharpens Iron',
        cards: [
          {
            type: 'verse',
            content: '"As iron sharpens iron, so one person sharpens another."\n\n— Proverbs 27:17',
          },
          {
            type: 'encouragement',
            content: 'The people you surround yourself with will either make you sharper or dull your edge. Real brotherhood isn\'t just hanging out — it\'s pushing each other to be better. Find friends who challenge you, call you out, and have your back.',
          },
          { type: 'question', question: 'Who are the 3-5 people you spend the most time with?' },
          { type: 'question', question: 'Do those people make you better or pull you down?' },
          { type: 'question', question: 'Is there someone you need to spend less time with? More time with?' },
          {
            type: 'action',
            content: 'Reach out to one person today who makes you a better man and tell them you appreciate them.',
          },
          { type: 'complete' },
        ],
      },
      {
        day: 2,
        title: 'Being a Good Friend',
        cards: [
          {
            type: 'verse',
            content: '"A friend loves at all times, and a brother is born for a time of adversity."\n\n— Proverbs 17:17',
          },
          {
            type: 'encouragement',
            content: 'It\'s easy to be around people when things are good. Real friendship is showing up when things are hard. Be the kind of friend who shows up in the tough moments — not just the fun ones. That\'s the kind of brotherhood that lasts.',
          },
          { type: 'question', question: 'When was the last time you showed up for a friend during a hard time?' },
          { type: 'question', question: 'Is there someone in your life right now who needs you to show up for them?' },
          { type: 'question', question: 'What kind of friend do you want to be known as?' },
          {
            type: 'action',
            content: 'Check in on a friend today — not with a text, but with a real conversation.',
          },
          { type: 'complete' },
        ],
      },
      {
        day: 3,
        title: 'Accountability',
        cards: [
          {
            type: 'verse',
            content: '"Therefore confess your sins to each other and pray for each other so that you may be healed."\n\n— James 5:16',
          },
          {
            type: 'encouragement',
            content: 'Accountability isn\'t about having someone police you — it\'s about having someone in your corner who knows your real struggles and helps you fight them. Every man needs at least one person he can be completely honest with. That kind of vulnerability takes courage.',
          },
          { type: 'question', question: 'Do you have someone in your life you can be completely honest with about your struggles?' },
          { type: 'question', question: 'What makes it hard to be vulnerable with other guys?' },
          { type: 'question', question: 'What would it look like to have a real accountability relationship?' },
          {
            type: 'action',
            content: 'Ask one trusted person to be an accountability partner for you in one specific area of your life.',
          },
          { type: 'complete' },
        ],
      },
      {
        day: 4,
        title: 'Avoiding Bad Influences',
        cards: [
          {
            type: 'verse',
            content: '"Do not be misled: \'Bad company corrupts good character.\'"\n\n— 1 Corinthians 15:33',
          },
          {
            type: 'encouragement',
            content: 'You become like the people you spend time with. This isn\'t about being judgmental — it\'s about being wise. You can care about someone without letting their choices drag you down. Set boundaries and choose your inner circle carefully.',
          },
          { type: 'question', question: 'Is there a friendship or group that consistently pulls you toward bad decisions?' },
          { type: 'question', question: 'How do you balance caring about someone while protecting yourself from their influence?' },
          { type: 'question', question: 'What boundaries might you need to set in a current relationship?' },
          {
            type: 'action',
            content: 'Identify one relationship where you need to set a boundary and take one step toward doing that today.',
          },
          { type: 'complete' },
        ],
      },
      {
        day: 5,
        title: 'Being a Leader',
        cards: [
          {
            type: 'verse',
            content: '"The greatest among you will be your servant."\n\n— Matthew 23:11',
          },
          {
            type: 'encouragement',
            content: 'Leadership isn\'t about being the loudest or the most popular. It\'s about serving others and setting the standard. When you live with integrity and put others first, people naturally follow. Lead by example, not by force.',
          },
          { type: 'question', question: 'In what areas of your life are you currently a leader (even informally)?' },
          { type: 'question', question: 'What is the difference between a leader who serves and one who dominates?' },
          { type: 'question', question: 'What is one way you can lead by example in your friend group this week?' },
          {
            type: 'action',
            content: 'Do one act of service for your friend group today — without being asked and without expecting credit.',
          },
          { type: 'complete' },
        ],
      },
    ],
  },
  {
    id: 'anger',
    title: 'Anger & Emotions',
    description: 'Learning to feel deeply without losing control.',
    icon: 'bolt',
    days: [
      {
        day: 1,
        title: 'Anger Isn\'t the Enemy',
        cards: [
          {
            type: 'verse',
            content: '"In your anger do not sin: Do not let the sun go down while you are still angry."\n\n— Ephesians 4:26',
          },
          {
            type: 'encouragement',
            content: 'Anger itself isn\'t a sin. It\'s a signal. It tells you something is wrong. The question is what you do with it. You can let anger fuel destruction, or you can channel it into action for good. The difference between a warrior and a bully is what they do with their anger.',
          },
          { type: 'question', question: 'What makes you most angry? Is that anger pointing to something important?' },
          { type: 'question', question: 'What do you usually do when you feel angry?' },
          { type: 'question', question: 'Has your anger ever hurt someone you care about?' },
          {
            type: 'action',
            content: 'The next time you feel angry today, pause and ask: "What is this anger telling me?" before reacting.',
          },
          { type: 'complete' },
        ],
      },
      {
        day: 2,
        title: 'The Slow Burn',
        cards: [
          {
            type: 'verse',
            content: '"My dear brothers and sisters, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry."\n\n— James 1:19',
          },
          {
            type: 'encouragement',
            content: 'The most dangerous anger isn\'t the explosion — it\'s the slow burn. Bitterness and resentment that you carry for days, weeks, or years. It poisons you from the inside. Letting go isn\'t weakness. It\'s choosing your own freedom over holding onto a grudge.',
          },
          { type: 'question', question: 'Is there someone you\'re holding a grudge against right now?' },
          { type: 'question', question: 'How is that bitterness affecting you and your relationships?' },
          { type: 'question', question: 'What would it take for you to let it go?' },
          {
            type: 'action',
            content: 'Write down the name of someone you\'re holding onto anger toward, and consciously choose to release it today.',
          },
          { type: 'complete' },
        ],
      },
      {
        day: 3,
        title: 'Emotions Are Not Weakness',
        cards: [
          {
            type: 'verse',
            content: '"Jesus wept."\n\n— John 11:35',
          },
          {
            type: 'encouragement',
            content: 'Jesus — the strongest man who ever lived — wept. He felt grief, anger, compassion, and joy. Emotions are not weakness. Suppressing them is what causes damage. Real men feel deeply and handle those feelings with maturity, not by bottling them up.',
          },
          { type: 'question', question: 'What emotions do you find hardest to express or admit to?' },
          { type: 'question', question: 'Where did you learn that certain emotions were "not allowed" for guys?' },
          { type: 'question', question: 'What would it look like to be emotionally honest without losing control?' },
          {
            type: 'action',
            content: 'Tell someone you trust one emotion you\'ve been hiding or suppressing lately.',
          },
          { type: 'complete' },
        ],
      },
      {
        day: 4,
        title: 'Controlling Your Tongue',
        cards: [
          {
            type: 'verse',
            content: '"The tongue has the power of life and death, and those who love it will eat its fruit."\n\n— Proverbs 18:21',
          },
          {
            type: 'encouragement',
            content: 'Words said in anger can\'t be taken back. They leave marks. Before you speak in a heated moment, remember that your words have the power to destroy or to build. A man who controls his tongue controls his life.',
          },
          { type: 'question', question: 'Can you think of a time your words in anger caused real damage?' },
          { type: 'question', question: 'What do you wish you had said instead?' },
          { type: 'question', question: 'What is your strategy for controlling your tongue when emotions run hot?' },
          {
            type: 'action',
            content: 'If there is someone you\'ve hurt with your words, reach out today and make it right.',
          },
          { type: 'complete' },
        ],
      },
      {
        day: 5,
        title: 'Channeling Your Passion',
        cards: [
          {
            type: 'verse',
            content: '"Be angry, and do not sin; ponder in your own hearts on your beds, and be silent."\n\n— Psalm 4:4',
          },
          {
            type: 'encouragement',
            content: 'The same fire that makes you angry at injustice can fuel you to change the world. Don\'t kill your passion — direct it. Channel your intensity into something that matters. The most driven men in history were fueled by righteous anger at the way things were.',
          },
          { type: 'question', question: 'What injustice in the world makes you angry enough to want to do something about it?' },
          { type: 'question', question: 'How can you channel your emotional intensity into something productive?' },
          { type: 'question', question: 'What would it look like to be a man of passion AND self-control?' },
          {
            type: 'action',
            content: 'Identify one cause or problem you care deeply about and take one small step toward doing something about it.',
          },
          { type: 'complete' },
        ],
      },
    ],
  },
{
    id: 'integrity',
    title: 'Integrity',
    description: 'Being the same man in the dark as you are in the light.',
    icon: 'verified',
    days: [
      {
        day: 1,
        title: "Who Are You When No One Watches?",
        cards: [
          { type: 'verse', content: '"The integrity of the upright guides them, but the unfaithful are destroyed by their duplicity."\n\n\u2014 Proverbs 11:3' },
          { type: 'encouragement', content: "Integrity is not what you do when people are watching. It's who you are when nobody is. The man you are in private is the real you. If there's a gap between your public and private self, that gap is where your character breaks down. Close the gap." },
          { type: 'question', question: 'Is there a difference between who you are in public versus in private?' },
          { type: 'question', question: "What is one thing you do or say in private that you wouldn't want others to see?" },
          { type: 'question', question: 'What would it look like to live the same way in every situation?' },
          { type: 'action', content: "Today, do one thing you'd be proud of even if absolutely no one ever found out about it." },
          { type: 'complete' },
        ],
      },
      {
        day: 2,
        title: 'Keeping Your Word',
        cards: [
          { type: 'verse', content: '"Simply let your \'Yes\' be \'Yes,\' and your \'No,\' \'No.\'"\n\n\u2014 Matthew 5:37' },
          { type: 'encouragement', content: "Your word is your bond. When you say you'll do something, do it. When you commit, follow through. A man who can't be trusted to keep his word is a man who can't be trusted at all. Build a reputation as someone whose yes means yes." },
          { type: 'question', question: "Think of a recent time you didn't follow through on something you said you'd do. What happened?" },
          { type: 'question', question: "Why do we sometimes make promises we don't keep?" },
          { type: 'question', question: "What is one commitment you've been putting off that you need to follow through on?" },
          { type: 'action', content: "Follow through on one commitment today that you've been delaying or avoiding." },
          { type: 'complete' },
        ],
      },
      {
        day: 3,
        title: 'Honesty Even When It Hurts',
        cards: [
          { type: 'verse', content: '"Truthful lips endure forever, but a lying tongue lasts only a moment."\n\n\u2014 Proverbs 12:19' },
          { type: 'encouragement', content: "Lying is always the easier path in the short term. But lies compound. One lie requires another, then another. Honesty — even when it's painful — builds trust and frees you from the exhausting work of maintaining a false version of yourself." },
          { type: 'question', question: "Is there a lie you're currently maintaining that is draining your energy?" },
          { type: 'question', question: 'What is the cost of being honest in that situation? What is the cost of continuing the lie?' },
          { type: 'question', question: 'Who in your life do you need to be more honest with?' },
          { type: 'action', content: "Have one honest conversation today that you've been avoiding." },
          { type: 'complete' },
        ],
      },
      {
        day: 4,
        title: 'Integrity Under Pressure',
        cards: [
          { type: 'verse', content: '"Whoever walks in integrity walks securely, but whoever takes crooked paths will be found out."\n\n\u2014 Proverbs 10:9' },
          { type: 'encouragement', content: "Anyone can have integrity when it's easy. The real test is when keeping your integrity costs you something — a friendship, a grade, a reputation. That's when character is revealed. The pressure doesn't create who you are; it exposes who you already are." },
          { type: 'question', question: 'Describe a time when doing the right thing cost you something. How did it turn out?' },
          { type: 'question', question: 'What is a situation right now where you feel pressure to compromise your integrity?' },
          { type: 'question', question: 'What would it look like to hold the line in that situation?' },
          { type: 'action', content: "Identify one area where you've been compromising under pressure and make a decision to hold firm today." },
          { type: 'complete' },
        ],
      },
      {
        day: 5,
        title: 'Owning Your Mistakes',
        cards: [
          { type: 'verse', content: '"He who conceals his sins does not prosper, but whoever confesses and renounces them finds mercy."\n\n\u2014 Proverbs 28:13' },
          { type: 'encouragement', content: "A man of integrity doesn't just avoid doing wrong — he owns it when he does. Blaming others, making excuses, or covering up mistakes are signs of weak character. Owning your failures, apologizing, and making it right is one of the most powerful things a man can do." },
          { type: 'question', question: "Is there a mistake you've been blaming on someone else or making excuses for?" },
          { type: 'question', question: 'What would it look like to fully own that mistake?' },
          { type: 'question', question: 'Who do you owe an apology or a correction to?' },
          { type: 'action', content: 'Own one mistake today — to yourself, to God, or to the person you wronged.' },
          { type: 'complete' },
        ],
      },
    ],
  },
  {
    id: 'discipline',
    title: 'Discipline',
    description: 'Doing what needs to be done, whether you feel like it or not.',
    icon: 'military-tech',
    days: [
      {
        day: 1,
        title: 'Feelings Are Liars',
        cards: [
          { type: 'verse', content: '"No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace for those who have been trained by it."\n\n\u2014 Hebrews 12:11' },
          { type: 'encouragement', content: "You will never feel like doing the hard things. Waking up early, working out, studying, praying — these rarely feel good in the moment. Discipline is deciding that your future self matters more than your present comfort. Stop waiting to feel motivated. Just start." },
          { type: 'question', question: "What is one thing you know you should do regularly but keep putting off because you don't feel like it?" },
          { type: 'question', question: "How does your life look different when you are disciplined versus when you aren't?" },
          { type: 'question', question: 'What would your future self thank your present self for doing today?' },
          { type: 'action', content: "Do one hard thing today that you don't feel like doing — without waiting to feel motivated." },
          { type: 'complete' },
        ],
      },
      {
        day: 2,
        title: 'The Power of Routine',
        cards: [
          { type: 'verse', content: '"Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up."\n\n\u2014 Galatians 6:9' },
          { type: 'encouragement', content: "Champions aren't built in a single great moment. They're built in thousands of ordinary moments where they chose to show up anyway. Your daily routine is either building you up or tearing you down. Small consistent actions compound into massive results over time." },
          { type: 'question', question: 'What does your current daily routine look like? Is it building you up or holding you back?' },
          { type: 'question', question: 'What is one habit you could add to your morning or evening that would make you better?' },
          { type: 'question', question: 'What is one habit you need to eliminate?' },
          { type: 'action', content: 'Design your ideal morning routine on paper. Start tomorrow with just the first step of it.' },
          { type: 'complete' },
        ],
      },
      {
        day: 3,
        title: 'Mastering Your Body',
        cards: [
          { type: 'verse', content: '"I discipline my body like an athlete, training it to do what it should."\n\n\u2014 1 Corinthians 9:27 (NLT)' },
          { type: 'encouragement', content: "Your body is a tool. If you don't control it, it will control you. Sleep, food, exercise, screen time — these all shape who you are and what you're capable of. A man who masters his physical habits builds the foundation for mastering everything else." },
          { type: 'question', question: 'Which physical habit (sleep, diet, exercise, screen time) is most out of control for you right now?' },
          { type: 'question', question: 'How does that habit affect your mood, focus, and relationships?' },
          { type: 'question', question: 'What is one physical discipline you could commit to for the next 30 days?' },
          { type: 'action', content: 'Take one concrete step today to improve a physical habit — go to bed on time, do 20 push-ups, drink water instead of soda.' },
          { type: 'complete' },
        ],
      },
      {
        day: 4,
        title: 'Guarding Your Time',
        cards: [
          { type: 'verse', content: '"Be very careful, then, how you live — not as unwise but as wise, making the most of every opportunity."\n\n\u2014 Ephesians 5:15-16' },
          { type: 'encouragement', content: "Time is the one resource you can never get back. Every hour you waste is gone forever. That doesn't mean you can't rest or have fun — but it does mean you should be intentional. The undisciplined man drifts through his days. The disciplined man steers them." },
          { type: 'question', question: 'Where does most of your time actually go each day? (Be honest.)' },
          { type: 'question', question: 'What is one thing you spend time on that gives you nothing back?' },
          { type: 'question', question: 'If you had one extra hour each day, what would you use it for?' },
          { type: 'action', content: 'Track how you spend every hour today. At the end of the day, review it honestly.' },
          { type: 'complete' },
        ],
      },
      {
        day: 5,
        title: 'Delayed Gratification',
        cards: [
          { type: 'verse', content: '"The plans of the diligent lead to profit as surely as haste leads to poverty."\n\n\u2014 Proverbs 21:5' },
          { type: 'encouragement', content: "Every great thing in life requires you to give up something now for something better later. The ability to delay gratification — to say no to the easy thing now for the right thing later — is one of the most powerful skills you can develop. It separates boys from men." },
          { type: 'question', question: "What is something you've given up on because it took too long to see results?" },
          { type: 'question', question: 'What is a short-term pleasure that is costing you long-term growth?' },
          { type: 'question', question: "What is one thing you're willing to sacrifice now for a better future?" },
          { type: 'action', content: 'Say no to one easy, immediate pleasure today in favor of a long-term goal.' },
          { type: 'complete' },
        ],
      },
    ],
  },
  {
    id: 'fear',
    title: 'Fear & Courage',
    description: 'Facing what scares you and walking through it anyway.',
    icon: 'whatshot',
    days: [
      {
        day: 1,
        title: 'Fear Is Not the Enemy',
        cards: [
          { type: 'verse', content: '"For God has not given us a spirit of fear, but of power and of love and of a sound mind."\n\n\u2014 2 Timothy 1:7 (NKJV)' },
          { type: 'encouragement', content: "Fear is not the enemy — it's a signal. It tells you something matters. The problem isn't feeling fear; it's letting fear make your decisions. Courage isn't the absence of fear. Courage is feeling the fear and moving forward anyway. Fear is the doorway to growth." },
          { type: 'question', question: 'What is something you are currently afraid of?' },
          { type: 'question', question: 'Is that fear protecting you from real danger, or is it just keeping you comfortable?' },
          { type: 'question', question: 'What would happen if you walked toward that fear instead of away from it?' },
          { type: 'action', content: "Do one small thing today that makes you uncomfortable or that you've been avoiding out of fear." },
          { type: 'complete' },
        ],
      },
      {
        day: 2,
        title: 'Fear of Failure',
        cards: [
          { type: 'verse', content: '"For though the righteous fall seven times, they rise again."\n\n\u2014 Proverbs 24:16' },
          { type: 'encouragement', content: "Most people never try because they're afraid to fail. But failure is not the opposite of success — it's part of the path to success. Every great man has a long list of failures behind him. The only real failure is refusing to get back up. Fall down seven times, get up eight." },
          { type: 'question', question: "What is something you haven't tried because you're afraid of failing?" },
          { type: 'question', question: 'What is the worst realistic outcome if you tried and failed?' },
          { type: 'question', question: 'What is the cost of never trying at all?' },
          { type: 'action', content: "Take one step today toward something you've been afraid to try. It doesn't have to be perfect — just start." },
          { type: 'complete' },
        ],
      },
      {
        day: 3,
        title: 'Fear of What Others Think',
        cards: [
          { type: 'verse', content: '"Fear of man will prove to be a snare, but whoever trusts in the Lord is kept safe."\n\n\u2014 Proverbs 29:25' },
          { type: 'encouragement', content: "The fear of what other people think is one of the most crippling forces in a young man's life. It keeps you from being yourself, from standing up for what's right, from pursuing your calling. Here's the truth: most people are too busy worrying about what you think of them to care what you do." },
          { type: 'question', question: 'In what areas of your life do you hold back because of what others might think?' },
          { type: 'question', question: "Whose opinion do you care about most? Is that person worth changing who you are for?" },
          { type: 'question', question: "What would you do differently if you truly didn't care what anyone thought?" },
          { type: 'action', content: "Do one thing today that you've been holding back from because of what others might think." },
          { type: 'complete' },
        ],
      },
      {
        day: 4,
        title: 'Facing the Hard Conversation',
        cards: [
          { type: 'verse', content: '"Speaking the truth in love, we will grow to become in every respect the mature body of him who is the head, that is, Christ."\n\n\u2014 Ephesians 4:15' },
          { type: 'encouragement', content: "One of the most common fears young men have is the fear of hard conversations — confronting a friend, admitting a mistake, saying what you really feel. Avoiding these conversations doesn't make the problem go away; it just lets it grow. Courage in conversation is a superpower." },
          { type: 'question', question: "What is a hard conversation you've been avoiding?" },
          { type: 'question', question: 'What are you afraid will happen if you have it?' },
          { type: 'question', question: 'What is likely to happen if you keep avoiding it?' },
          { type: 'action', content: "Schedule or initiate one hard conversation you've been putting off." },
          { type: 'complete' },
        ],
      },
      {
        day: 5,
        title: 'Perfect Love Casts Out Fear',
        cards: [
          { type: 'verse', content: '"There is no fear in love. But perfect love drives out fear."\n\n\u2014 1 John 4:18' },
          { type: 'encouragement', content: "The deepest antidote to fear is love — knowing you are fully known and fully accepted. When you know that your worth isn't on the line, you can take risks. When you know you're loved unconditionally, failure loses its sting. You are loved. You are secure. Now go be bold." },
          { type: 'question', question: 'Do you truly believe you are loved unconditionally? Why or why not?' },
          { type: 'question', question: 'How would your life look different if you lived from a place of security rather than fear?' },
          { type: 'question', question: "What is one bold step you've been afraid to take that you're now ready to take?" },
          { type: 'action', content: "Write down one bold thing you commit to doing in the next 7 days that fear has been holding you back from." },
          { type: 'complete' },
        ],
      },
    ],
  },
  {
    id: 'forgiveness',
    title: 'Forgiveness',
    description: 'Releasing the weight of bitterness and choosing freedom.',
    icon: 'healing',
    days: [
      {
        day: 1,
        title: "The Weight You're Carrying",
        cards: [
          { type: 'verse', content: '"Get rid of all bitterness, rage and anger, brawling and slander, along with every form of malice. Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you."\n\n\u2014 Ephesians 4:31-32' },
          { type: 'encouragement', content: "Unforgiveness is like drinking poison and waiting for the other person to die. The person who hurt you may have moved on completely — but you're still carrying the weight of what they did. Forgiveness isn't for them. It's for you. It's choosing your freedom over your right to be angry." },
          { type: 'question', question: 'Who is someone you are holding unforgiveness toward right now?' },
          { type: 'question', question: 'How is that unforgiveness affecting your life, mood, or relationships?' },
          { type: 'question', question: 'What would it feel like to truly let it go?' },
          { type: 'action', content: 'Write down the name of someone you need to forgive. Acknowledge the hurt, then write: "I choose to release this."' },
          { type: 'complete' },
        ],
      },
      {
        day: 2,
        title: 'Forgiveness Is Not Weakness',
        cards: [
          { type: 'verse', content: '"Do not repay anyone evil for evil. Be careful to do what is right in the eyes of everyone."\n\n\u2014 Romans 12:17' },
          { type: 'encouragement', content: "Culture tells you that forgiving someone is weak — that real men hold grudges and get revenge. That's backwards. It takes far more strength to forgive than to retaliate. Revenge keeps you chained to the person who hurt you. Forgiveness sets you free and moves you forward." },
          { type: 'question', question: 'Have you ever seen forgiveness mistaken for weakness? What happened?' },
          { type: 'question', question: 'What is the difference between forgiving someone and letting them keep hurting you?' },
          { type: 'question', question: 'What would it look like to forgive someone while still maintaining healthy boundaries?' },
          { type: 'action', content: "Reflect on one situation where you've confused forgiveness with weakness. Reframe it as strength." },
          { type: 'complete' },
        ],
      },
      {
        day: 3,
        title: 'Forgiving Yourself',
        cards: [
          { type: 'verse', content: '"As far as the east is from the west, so far has he removed our transgressions from us."\n\n\u2014 Psalm 103:12' },
          { type: 'encouragement', content: "Sometimes the hardest person to forgive is yourself. You replay the mistake, the failure, the sin — over and over. But God doesn't hold it against you once it's confessed. If he's removed it as far as the east is from the west, why are you still carrying it? Let it go." },
          { type: 'question', question: "What is a past mistake or failure you haven't been able to forgive yourself for?" },
          { type: 'question', question: 'Do you believe God has forgiven you for it? Why or why not?' },
          { type: 'question', question: 'What would change in your life if you truly forgave yourself?' },
          { type: 'action', content: "Write down one thing you've been holding against yourself. Then write: 'This is forgiven. I am moving forward.'" },
          { type: 'complete' },
        ],
      },
      {
        day: 4,
        title: "When It's Really Hard to Forgive",
        cards: [
          { type: 'verse', content: '"Then Peter came to Jesus and asked, \'Lord, how many times shall I forgive my brother or sister who sins against me? Up to seven times?\' Jesus answered, \'I tell you, not seven times, but seventy-seven times.\'"\n\n\u2014 Matthew 18:21-22' },
          { type: 'encouragement', content: "Some things are genuinely hard to forgive. Betrayal, abuse, deep wounds. Jesus doesn't minimize that. But he still calls us to forgive — not once, but over and over. Forgiveness is often a process, not a single moment. You may have to choose it again tomorrow, and the day after. That's okay." },
          { type: 'question', question: 'Is there a wound so deep that forgiveness feels impossible right now?' },
          { type: 'question', question: "What would it look like to take one small step toward forgiveness, even if you're not all the way there?" },
          { type: 'question', question: 'Is there someone you need to talk to — a mentor, counselor, or trusted adult — about what you are carrying?' },
          { type: 'action', content: "If you're carrying something too heavy to forgive alone, reach out to a trusted person today and share it." },
          { type: 'complete' },
        ],
      },
      {
        day: 5,
        title: 'Reconciliation vs. Forgiveness',
        cards: [
          { type: 'verse', content: '"If it is possible, as far as it depends on you, live at peace with everyone."\n\n\u2014 Romans 12:18' },
          { type: 'encouragement', content: "Forgiveness and reconciliation are not the same thing. You can fully forgive someone without restoring the relationship — especially if they're unsafe or unrepentant. Forgiveness is always required. Reconciliation requires two willing people. You can do your part and still protect yourself." },
          { type: 'question', question: "Is there a relationship where you've confused forgiving someone with having to trust them again?" },
          { type: 'question', question: 'What does "as far as it depends on you" mean in a relationship you are struggling with?' },
          { type: 'question', question: 'Have you done your part to pursue peace in that relationship?' },
          { type: 'action', content: 'Take one step today to do your part in a broken relationship — even if it is just praying for the person.' },
          { type: 'complete' },
        ],
      },
    ],
  },
  {
    id: 'leadership',
    title: 'Leadership',
    description: 'Learning to lead yourself before you can lead others.',
    icon: 'star',
    days: [
      {
        day: 1,
        title: 'Lead Yourself First',
        cards: [
          { type: 'verse', content: '"Whoever can be trusted with very little can also be trusted with much."\n\n\u2014 Luke 16:10' },
          { type: 'encouragement', content: "You cannot lead others if you can't lead yourself. Before you can be trusted with a team, a family, or a mission, you have to prove you can manage your own life. Leadership starts in the small things — your room, your schedule, your word, your habits. Master the small things first." },
          { type: 'question', question: 'What areas of your own life are you struggling to lead well right now?' },
          { type: 'question', question: "How can you expect others to follow you if you can't manage yourself?" },
          { type: 'question', question: 'What is one small area you can take more ownership of starting today?' },
          { type: 'action', content: 'Clean up or organize one area of your life that has been out of control — your room, your phone, your schedule.' },
          { type: 'complete' },
        ],
      },
      {
        day: 2,
        title: 'Servant Leadership',
        cards: [
          { type: 'verse', content: '"Whoever wants to become great among you must be your servant, and whoever wants to be first must be your slave — just as the Son of Man did not come to be served, but to serve."\n\n\u2014 Matthew 20:26-28' },
          { type: 'encouragement', content: "The world's idea of leadership is power, status, and control. Jesus flipped that completely. The greatest leader in history washed feet. Real leadership is about serving the people you lead, not using them. The leader who serves is the one people actually want to follow." },
          { type: 'question', question: 'Who are the leaders in your life that you respect most? What makes them different?' },
          { type: 'question', question: 'In what ways have you tried to lead through control or status rather than service?' },
          { type: 'question', question: 'Who in your life could you serve more intentionally this week?' },
          { type: 'action', content: 'Do one act of service for someone in your family, friend group, or community today — without being asked.' },
          { type: 'complete' },
        ],
      },
      {
        day: 3,
        title: 'Setting the Standard',
        cards: [
          { type: 'verse', content: '"Don\'t let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity."\n\n\u2014 1 Timothy 4:12' },
          { type: 'encouragement', content: "Leaders don't wait for someone else to set the standard — they set it themselves. You don't have to be the oldest, the strongest, or the most experienced to lead. You just have to be willing to live at a higher level and invite others to rise with you. Your life is a message." },
          { type: 'question', question: 'What standard are you currently setting for the people around you?' },
          { type: 'question', question: "Is there an area where you're following the crowd instead of setting the pace?" },
          { type: 'question', question: 'What would it look like to raise the standard in your friend group?' },
          { type: 'action', content: 'Identify one way you can raise the standard in your environment today and do it.' },
          { type: 'complete' },
        ],
      },
      {
        day: 4,
        title: 'Making Hard Decisions',
        cards: [
          { type: 'verse', content: '"If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you."\n\n\u2014 James 1:5' },
          { type: 'encouragement', content: "Leadership means making decisions — often hard ones with incomplete information. Indecision is a decision in itself, and it's usually the worst one. Leaders gather wisdom, seek counsel, pray, and then decide. They don't wait for certainty. They act on faith and adjust as they go." },
          { type: 'question', question: "What is a decision you've been avoiding or delaying?" },
          { type: 'question', question: 'What information or wisdom do you need to make that decision?' },
          { type: 'question', question: 'Who is someone wise you could seek counsel from?' },
          { type: 'action', content: "Make one decision today that you've been putting off. Seek wisdom first, then act." },
          { type: 'complete' },
        ],
      },
      {
        day: 5,
        title: 'Leaving a Legacy',
        cards: [
          { type: 'verse', content: '"A good man leaves an inheritance for his children\'s children."\n\n\u2014 Proverbs 13:22' },
          { type: 'encouragement', content: "Every man leaves a legacy — the question is what kind. Your legacy isn't built in a single moment; it's built in thousands of daily choices. The way you treat people, the values you live by, the character you build — these outlive you. Start building your legacy now, while you're young." },
          { type: 'question', question: 'What do you want people to say about you at the end of your life?' },
          { type: 'question', question: 'Are your daily choices right now building toward that legacy?' },
          { type: 'question', question: "What is one thing you want to be known for that you're not currently known for?" },
          { type: 'action', content: "Write a one-paragraph description of the legacy you want to leave. Keep it somewhere you'll see it often." },
          { type: 'complete' },
        ],
      },
    ],
  },
];

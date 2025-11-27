let rotationValues = [5, -3, 8, -2, 10, -1, 6];

function rotateGalleryItems() {
    const container = document.querySelector(".gallery");
    if (!container) return;
    
    const items = container.children;
    
    Array.from(items).forEach((item, index) => {
        const rotation = rotationValues[index % rotationValues.length];
        item.style.transform = `rotate(${rotation}deg)`;
    });
}
// script.js - handles sticky stack explode + form adding notes

let exploded = false;

// control note (not part of the notes array / grid)
const controlNote = { name: '', msg: 'Click me! Hover over a message to bring it to the top.' };

// sample initial notes (these will be colored using --note1..--note6)
let notes = [
    {name: `Kierson Pope`, msg: `Thank you for all of your hard work and especially for giving me a chance, even when I had zero experience and no prospects. If it hadn’t been for you encouraging me to, I never would’ve tried jazz or auditioned for All State or any of the other things I’ve gotten to do here. 2 years ago, I was way too scared to try new things, even when I really wanted to, and I’m not anymore, thanks to you pushing me out of my comfort zone. I really do appreciate everything you’ve done for me and this whole band; you’ve done a huge part in making this the place I love so much. Thank you for everything you do and sacrifice for us- we really do see it and it means more than you know. (ps, happy thanksgiving)`},
    {name: `Maxwell`, msg: `Hey, Just wanted to let you know that you have been a priceless asset to this program. I can’t even imagine where I would be going with my career or life without your leadership and the band community it’s shaped. I hope that your Thanksgiving will give you some family time, much-needed rest, and hopefully some peace. We’re all here for you.`},
    {name: `Tyson Pippin`, msg: `Thank you for helping into marching band and believing in me.`},
    {name: `macy`, msg: `Mr. Scott!!! you have really made my first season of marching band incredible! i enjoyed it even more than i thought i would and i appreciate all that you have done to make the program as great as it is!😊`},
    {name: `Britta herman`, msg: `Mr Scott, you are such an amazing person and you do so much for all of us. Thanks you to everything that you do and for all the time you spend helping us grow and improve with music and life skills. You are great!`},
    {name: `Andrew Millette`, msg: `We love you, Mr Scott!! -Andrew M`},
    {name: `Milit`, msg: `Your resilience is truly remarkable, we love you!`},
    {name: `Reily Chelten`, msg: `Thank you for being so cool and making everyone laugh. 😎`},
    {name: `lilato jonas`, msg: `Mr scott i’m so thankful for you, The whole reason i still do band is because of you so thank you for being my band director!`},
    {name: `Evelyn Brook`, msg: `Thank you so much for pushing us to be the best version of ourselves and doing what it takes to be great. `},
    {name: `Maximus Capitani`, msg: `Mr Scott, when I came to Cambridge I was pretty bad with music and look horrible visually but you made me better and I see the way you interact with everyone else that I know none other band directors would do and I appreciate you for just working as hard as you do. Many thanks, Maximus Capitani`},
    {name: `Mason`, msg: `Thank you for always doing so much for us. We wouldn’t have any of these opportunities without you.`},
    {name: `ethan hudock`, msg: `you are a great band director `},
    {name: `Sarah Bowman`, msg: `Hey Mr Scott! I wanted to say thank you so much for the countless hours you put into this program. I genuinely cannot imagine being in a program without you as my band director, you have taken this program so far in the short time you’ve been here in all aspects of the program. You inspire me every day to work harder to create a positive culture for the program and to shoot for excellence in every aspect of my life. The lessons I’ve learned from you and the speeches you give have been so empowering and hope I can spread them to the people I meet in the future. Love ya!`},
    {name: `Johanna Glaze`, msg: `Hi Mr. Scott! I just want to say you make the program so much better and you are an absolutely amazing band director and i’m so thankful for everything you do for all of us! I really believe this season has changed me for the better and i couldn’t be happier. You are the reason everyone loves this activity. Band has always been something i really enjoy and care about and thank you for making this season so great. Thank you for everything that you do for us and thanks for being the best band director ever!!`},
    {name: `Emily Edison`, msg: `Hey! Thank you so much for everything you do! I really appreciate all the hard work you do into making this program amazing, and also the show this year was incredible!`},
    {name: `Penelope`, msg: `Hi!! Thank you so much for sacrificing so much time for the band program and specifically marching band. I love the community that you’ve created, all my friends are either in band or wish they were just because they see how amazing it is. Your effort is so appreciated! thank you for giving us a program that feels like a closer knit family than any other program!!`},
    {name: `Jude Alexander`, msg: `Thank you so much for making band such a fun and exciting class to go to! It’s my favorite class to be in so far, even if it’s just a fundamentals day. Also, thank you for putting me on French Horn in 6th grade! It’s so unique and I’ll keep practicing until I get my 5 dollars. Finally, thank you for being a wonderful band director and band teacher! Over the past 2 years, Ethan has been talking about how fun and entertaining you are, and I was extremely excited to join high school band. Thanks so much for everything!`},
    {name: `Derrick`, msg: `I thank you for being an amazing Band Instructor, and I wish that you get to spend some time with your father.`},
    {name: `Kennedy Limon`, msg: `One thing about this guy is he never ever gives up. He is so persistent, so confident, and so so sure in himself and what he wants for his band kids. He doesn’t have children (i believe) but he still treats each and every one of us with such care. He’s like another parent for me. Mr scott, you helped me throughout my dumbest and most difficult moments with such understanding and kindness yet with such passion for music…so much so you had to beat the dumbness out of my blind self. I always am so thankful for everything you do for the program (because let’s be honest, without you, this program would be a quarter of the size it is now) and you have helped me grow as a person and also as a musician. You have pushed me to beyond what i believe i could do. GHP for example, i did not think i could ever make it past such a thing, yet i succeeded that challenge because of you. You believe in each and every one of your students and care for each one of us like we’re your own kids. I’m always so grateful for everything you’ve done for this program, those around you, and me. Keep being great :D`},
    {name: `Sawyer McGinnis`, msg: `Mr. Scott, I want you to know that your guidance and leadership as a band director has completely shaped my experience here. Over the past 5 years, you have led the band to some of the best state-wide and national opportunities a program can participate in. You have pushed us to an incredible level of excellence, showcasing our ability at Grand Nationals, GMEA, and all the performances in between. All these things have had such a huge impact on me, yet they are shadowed by the way you push us to grow, not just play well. You are constantly driving our standard of excellence, not allowing us to stagnate and lose our momentum. You challenge us to be better musicians, better leaders, and also better people, never settling for "good enough." I have never been a part of a program with a more dedicated and passionate leader, especially not one who has had as much success in creating an unforgettable world-class experience. However, your impact has not just been on the program as a whole. You make sure every single member in the Cambridge band is thriving in this atmosphere of ongoing growth. You notice and care for every individual in a way that is rare in such a large community. I remember one of the days in the first week of freshman year, when I had barely gotten to know you. That day, I spoke to my counselor during B2 and realized that I couldn't do theater with band. I was feeling extremely disappointed, so you took me into your office and talked to me for the rest of the period to make sure I was feeling better. That was the first time someone had done something like that for me, and it's just part of who you are. You continue to check in with me regularly, even with your unimaginably time-consuming responsibilities, and I appreciate that so much. I've also heard countless things about what you've done to help each of us in any way possible, and it's clear that your dedication to us is just a part of who you are. Knowing that you genuinely care has made me feel supported and motivated in so many different ways, and it has shaped how I approach challenges and leadership in my own life.
        Finally, I wanted to talk about your impact on me and my development as a person. This is the hardest part for me to put into words since there is so much you have done to influence me, but here goes! Your innovative and passionate approach to leading the program really makes a difference. You refuse to let us aim for anything besides excellence, making sure to let us know when we are aiming too low. You have a no BS attitude and you are a baller in every way possible. Because of you, I've become much stronger and more confident in the best ways. Before Cambridge Band, I was moderately social, but I mostly stayed inside the bubble of kids I knew. I wouldn't really interact with people outside of the things that I did, and I definitely wasn't comfortable with representing my interests when I was around unfamiliar people. I find that I have adopted an attitude that is more opposed to people getting in my way for no reason (I don't know how else to put it 😭). It may seem like a small thing, but I find it way easier to take control of a situation, even when I'm not familiar with people (for example, randomly assigned group projects). There are plenty more things that I embody from you, but this note is long enough as is. I want to end this by saying that you are such an incredible and unique leader, and that I would never have been even CLOSE to the person I am now without your extraordinary guidance.`},
    {name: `Ace Leyva`, msg: `Thank you for your commitment to the band program and for leading us through the season.`},
    {name: `Maya Berezitsky`, msg: `You make us all feel so loved and cared for <3`},
    {name: `Ethan Alexander`, msg: `Thank you so much for pushing me. You’ve made me better in all that I do, and you’ve given me a passion for something I never thought I’d love. You’re the best teacher I’ve ever had and you’ve left an impression on me that will last forever. Thank you`},
    {name: `Fabian Murry`, msg: `He's helped me with understanding music, preforming better, and lent me an instrument to use. A key part in me wanting  to be in band.`},
    {name: `Arnav J`, msg: `Thank you so much for encouraging me to work harder and get better at trumpet, and working so hard to help us improve how we sound.`},
    {name: `Preston Holloway`, msg: `Hello Mr. Scott, I just want to thank you for making my band experience. If it wasn’t for you, I believe that there wouldn’t be so many good people in the band program, including me. You have put so much hard work into our band. Thank you. -Preston Holloway`},
    {name: `Bryce Jones`, msg: `Hi Mr. Scott!! Thank you so much for for everything you do for this program! You’re so much more than just a teacher and I really appreciate the way you connect with each student individually. You’ve taught me lessons that go far beyond band and I’m so grateful for that. I’m so excited for the next two years and I know we’re going to do great things! Thanks again for everything <3 -Bryce`},
    {name: `McKayla Rudolf`, msg: `Thank you for being an awesome band director!`},
    {name: `Aadi Bhoti`, msg: `Hey Mr Scott! I just wanted to tell you how thankful I am that you are our band director. You helped me grow my passion for music and helped me become a much better player.`},
    {name: `Ryan Rudolf`, msg: `Thank you for turning my bleak, boring life colorful again. My life didn’t feel correct, like a blank canvas in an art museum. Now I’m colorful again, with a will to live too`},
    {name: `lily reynolds`, msg: `Thank you for all that you do for us and our program. Its such a privilege to have a community that has been fostered so well where I look forward to coming to school every day. I look forward to seeing my friends of course, but I think I speak for all of us when I say we look forward to seeing you. I know that no matter what, if I need anything at all, you’ll be there. And thats something that not many people have, and I think we even take it for granted at times. But truly, I appreciate your non stop dedication to not only the wellbeing of our program, but also the wellbeing of each of the bricks that are the current building blocks of this program. You have seen me and I am sure many others at our highest highs and our lowest lows, and no matter what you stay strong, and you help is through it, regardless of whats going on in your own life. Thank you for being such a constant in my life, and the lives of many others. I know it might not mean much for me to say this, (considering most of us are literal teenagers) but just as you have been here for me, myself and many others are here for you if you need anything at all. We love you lots Mr. Scott, and we’ll be by your side no matter what ❤️`},
    {name: `Atharv Joshi`, msg: `Thank you Mr. Scott for all you’ve done, up till last year, I used to think that all there was to playing the trumpet was playing the right notes. But ever since band camp you’ve helped me increase my trumpet playing skills so much. I’m really happy that I decided to stay in band. Thank you for all you’ve done!!`},
    {name: `Rebecca Pascuzzi`, msg: `Mr. Scott, Thank you so much for yet another incredible marching season! I’m so lucky I got to be a part of this community especially as an 8th grader, so i’m extremely thankful that I got that opportunity because of you. I’ve been around cambridge band for a while, and honestly, I don’t think I’ve ever seen someone put so much into a program as you do. The time and love that you selflessly give so that we can have such an amazing band community is really admirable. I know that in some way you’ve made a difference in every single cambridge band kid’s life, and we’re all so lucky to have you to learn from. I’m so excited for band in high school! Thank you for all that you do! -Rebecca Pascuzzi`},
    {name: `Aiva Vegeleviciute`, msg: `Hi Mr. Scott! Im so glad that I’ve got to be in your marching band. You are amazing`},
    {name: `Amelia n`, msg: `Heyy!! You’re probably the coolest and most motivating and inspirational person I know! You have helped me grow as such a more hard working person and I view every situation in my life differently now because of these past 3 years with you as a director! You’re so motivating and I love your speeches and you really really make our band as strong as it is! You’re also super funny  and cool and amazing to hang around! And I love your relationships with all your students! Even tho you were super scary at first you turned out to be a super awesome guy! Thank you for teaching me so much these past 3 years and impacting my highschool career so much! Can wait to see what impact you make to further generations!`},
    {name: `Haruka Schamberger`, msg: `Thank you so much for pushing our program to be the best. You’re an amazing teacher and I hope you never forget that 🎉`},
    {name: `Lawson Snowball`, msg: `Thank you Mr. Scott for everything that you do, our program wouldn't be the same without your impactful input. Without your effort, our program would not be going to competitions or getting better each year. Much appreciation.`},
    {name: `David Prevallet`, msg: `Thank you for all the sacrifices that you make for this program, we are all truly grateful. I can’t wait to see the program grow from here (and win grand nats)`},
    {name: `Oliver Johnson`, msg: `Thank you so much for pushing me over the past two years I never would have been able to pick up bass guitar and learn to read sheet music without that push from you and thank you for making me an overall better musician.`},
    {name: `Matthew Pilotzi`, msg: `Thank you Mr Scott for giving me a great final marching band year and show, I had a lot of fun these past four years and I’ve really enjoyed it. Thanks for giving me the opportunity to make new friends and enjoy new experiences `},
    {name: `Annabelle Johnson`, msg: `Hi Mr. Scott!! Thank you so much for your dedication to this program. Despite not going to your school, I always hear how much work you put in - whether that be marching band, concert band, jazz, coming to winterguard rehearsals, simply living downtown (holy traffic), etc.(because i know you do wayyyy more than that.) It’s all truly admirable. On top of all of that, you make the sport fun. So yeah, thank you!!`},
    {name: `Bridson`, msg: `Thank you so much for everything you do. I know you sacrifice so much and I’m so grateful for you!`},
    {name: `Camila Borsari De Araujo`, msg: `Hi Mr. Scott! I just wanted to say thanks for sticking with all of us, pushing us, and laughing with us. Thank you for getting us through this season, especially with whatever was happening with that tarp. Honestly, thank you for showing up for us every single day, even when it was rough. You always support us, and you care so much. We appreciate you more than you know. I’m so excited for next season!`},
    {name: `Joey`, msg: `Thanks for all the work you do behind the scenes. Thanks for pushing us beyond our limits! -Joey`},
    {name: `Jonah Shapiro`, msg: `Mr Scott, I just wanted to thank you for your unwavering commitment to this program. Because of the work you put in, we are able to have so many different opportunities to make music and friendships. I genuinely believe that all of the things that I have been able to accomplish in the Cambridge band program have changed me as a person for the better, and it will shape the trajectory of my entire life. As an 8th grader I remember feeling giddy about high school band, I was also very nervous about stepping into the role of being first chair as a freshman. It wasn’t easy, but I gained so much confidence and it made me so much better at trumpet and also so much more confident as a person. More personally, when I was younger, I was a very socially anxious kid. Living in Florida, I definitely experienced fear around getting to know other kids but I already had an established group of friends that I had made from a very early age, when I kinda didn’t care what people thought of me and just obliviously interacted. Moving  to Georgia the summer before 5th grade was a very difficult experience for me because I didn’t really know how to make friends, and I had an intense fear of being rejected or disliked. I had experiences where other people would befriend me but then begin to mock me and treat me poorly once I showed my true self. Middle school was brutal, and to the dismay of my parents I developed a thick shell and refused to develop close relationships with other people. 8th grade was a better year where I got closer to kind people, but I can honestly say that it wasn’t until I entered the Cambridge Band program that I felt truly accepted and valued in a community. Because of your leadership, we have a community where we can unapologetically be ourselves. I see other band programs where the same bullying, harassment, and drama that I was entrenched by in middle school is rampant, but not in the Cambridge Band program. I know that being a band director, as you’ve said, can be a very challenging and isolating job, and must be extremely difficult to balance with your personal life. But please recognize the profound difference that you have made in my life and all of our lives. We love you so much!`},
    {name: `Alex Turc`, msg: `Dear Mr. Scott, Thank you for your tireless work and dedication. In all the organizations that I have been in, I have never met a person so committed and focused on making something great. Even if some of our success comes from the hard work of the students, it all stems from you. You are the one that pushed us, encouraged us to practice, and taught us to apply ourselves in everything that we do, no matter how seemingly insignificant. Ultimately, your effort has led to the making of the band program that we have today. Even in hard times, the entire band will always have your back. -Alex Turc`},
    {name: `Soumith Gollu`, msg: `Hi Mr. Scott, I just wanted to appreciate how much you have done for us. I’m really grateful to have you as our band director. You go out of your way to make sure that we can become the best versions of ourselves and Mae us feel like we belong. Thank you for pushing us to be better.`},
    {name: `Kennedy Wilson`, msg: `Thanks for everything Mr.Scott!! When I got to high school I was so scared and nervous. I had joined band at such a stressful time as we were going to GMEA. Going from middle school where the hardest rhythms I had were  quarter notes and eighth notes to high school, I did not believe in myself.But thankfully you pushed me to be better and you were one of the first people that believed in me. If it weren’t for you i probably would not be doing band and i am so grateful for you because of that!`},
    {name: `Alexa McCarley`, msg: `Hi Mr. Scott! Thank you so much for always believing in me and being there even when I came late to practice every day!`},
    {name: `Liam`, msg: `Thank you, Mr. Scott, for giving me the opportunity to be part of the marching band in 8th grade, It’s been such a fun and meaningful experience. I also want to thank you for being so supportive throughout the season and for helping me grow not only as a musician, but as a person. I’m grateful that you’re giving me the chance to be in Jazz Band as well, and for allowing me to get a “preview” of high school band. I’m really looking forward to next season and to Jazz. Thank you, Mr. Scott`},
    {name: `Alex Fuller`, msg: `Hi Mr. Scott, thank you for everything, because the band program you have created has made my experience in high school so much better. I am grateful that I was able to be a part of the first class that you recruited and I won’t ever forget watching you sneak in front of me in your terrible grinch costume during our Christmas concert to scare Max. You have always showed us tough love, and sometimes thats made me not want to be there, or feel embarrassed, but as my years in band have gone on, I understand that everything you do is to help us become our best selves. Having you as a teacher has been an invaluable experience and I truly am thankful for you and respect how dedicated you are to helping us grow as musicians and as people. -Alex`},
    {name: `Benjamin Chavis`, msg: `Mr. Scott, you make the Cambridge band what it is. You create an amazing environment for everyone, and I can’t express how grateful I am. You guide and inspire people to be better, at least, that’s what you’ve done for me. I couldn’t imagine doing band for the past three years without you. Thank you for everything you do. I think I can speak for everyone when I say that we all love you.`},
    {name: `sophia c`, msg: `Thank you for everything you’ve done for us this season. I’ve had the privilege of seeing firsthand just how much work, energy, and heart you pour into this program. Your dedication doesn’t just shape our performances, but it shapes our confidence, our teamwork, and the standard we hold ourselves to every day as well. Thank you for trusting me in this role and guiding me and supporting both the band and i through every challenge we had to deal with this season. The long rehearsals, the attention to detail, as well as the passion you have gives us so much love for you and it truly makes a difference. I’m grateful for everything you’ve taught me and for the confidence you inspire in all of us. I can't wait for next season as well as the rest of this school year.`},
    {name: `Gavin Buenaventura`, msg: `Hey Mr. Scott, I can't express enough how amazing these past four years have been. I have had an amazing time with this program and I am so sad to leave it. I can't thank you enough for all the experiences you have given us as well as the opportunities that we have been provided. There had been some ups and downs these past four years, but through it all you have supported me and pushed me to be my best self. If it were not for you I would not have been able to explore leadership opportunities and the ways that I can have a positive impact on people in the program. Your influence on the culture has allowed so many friendships to form and for so many people's lives to be changed. You have taught me what it means to work hard and win and without you I wouldn't know what feeling is. I feel so ready for college and this new chapter in life because of you and what you have provided me. With all my heart, I appreciate the dedication, passion, and sacrifice that you have put into this program. From taking us to away games just so that we can have the time of our lives, even though you may not have enjoyed it as much, to missing opportunities to see your family or have just some free time. It's so amazing how much you care about this program and it inspires me every single day to do the same. Your speeches are so motivational and thought provoking that whenever I have a hard time, I think about those speeches. When you talked about what it takes to be a one percenter, it made me reevaluate myself as both a musician and a student. If I am struggling to get something done , I just think about some of your moes reoccurring words- "it's a cold night on Mount Everest", "when you think you are done you have 60 percent left to give", and "our greatest fear is not that we are inadequate, it is that we are powerful beyond measure." These words echo in my head daily and will remain with me, inspiring me, driving me for the rest of my life. Thank you so much Mr. Scott for everything and I hope no matter what you continue to change peoples lives for the better. - Gavin Buenaventura`},
    {name: `Lena Haseeb`, msg: `Thank you for always being an amazing supporter and teacher. I can’t even describe how much I appreciate all the work you put in for the band. No matter what, you’re always there for us.You’ve made Highschool so much more fun and better for me. I don’t know what I would be doing if I wasn’t in band. You’ve provided me and everybody with so many experiences I don’t think I or we’ll ever forget. Thank you!`},
    {name: `Joel Lee`, msg: `Mr. Scott, I want to take some time today to tell you how grateful I am to be your student. I know you don’t get this enough, but thank you for being our director. You’ve taught me so much more than anything I ever could’ve imagined while being in this program. You’ve allowed for band to be my second family because of the way you built it. After 8th Grade, I was unsure if I wanted to continue band through high school. But I kept thinking of how amazing band would be with you as our director. That decision might’ve been the best I’ve ever made. If I had a hundred other lives, I would choose to be your student every single time. Thank you for all your efforts to put us students first, thank you for the memories I’ll cherish for the rest of my life, and Thank you, for being the best band director I could’ve ever had.`},
    {name: `deacon`, msg: `I appreciate your patience for the band program and your strive for perfection`},
    {name: `Matthew Cox`, msg: `Thank you so much for being such a fun and engaging band director! Unlike most other programs I’ve seen, you’ve made sure we have had the most unique and enjoyable music/show/and experience possible. I’m excited to work with you for the next couple of years and see what we do as a program.`},
    {name: `Emma Hunt`, msg: `Hey Mr. Scott!! Thank you for all you've done for us this season. You always encourage us to be better and don't let us settle for "good enough". You always make an effort to get to know everyone and we appreciate it. Thank you again for everything!`},
    {name: `Sydney Edison`, msg: `I’m really thankful that you are our director for band, marching band, and jazz. I love the influence you have on us and the positive messages you give us. I think that the band is a better and more positive place because of you and I really appreciate the vibe that you bring. Thank you!`},
    {name: `Sammy`, msg: `Thank you for the thought and care you put into this program, and for the dedication you’ve shown to each individual member with a desire for them to succeed.`},
    {name: `Beau`, msg: `To all the marching shows I’ve been to, they were mostly pirate shows, or something plain. But this years Cambridge show was different than other schools shows. It represented our difference from all the other bands. All of it was possible because of our director, Mr Scott.`},
    {name: `Sophia Minze`, msg: `Hi Mr Scott!!! I just wanted to say thank you so much for everything you do for our program. You’re always sacrificing so much of your time and effort and attention so each of our groups can be the best they can be!! You have so many ensembles going on at once, yet they all excel under you. You’re the best band director we could ever ask for!! Thank you for being so amazing!!`},
    {name: `Elliott`, msg: `Hi Mr Scott! I just want to let you know how much I appreciate everything you do for me and the band program. You sacrifice so much of your time and effort into making our program the best it can possibly be and I want you to know that everyone in the programs sees that and admires and appreciates you so much for it. You truly have made such a big impact on my life and I honestly don’t know where I would be if you weren’t my band director. You have taught me so much not only about music and becoming a better musician but about how to be become the best possible version of myself. The amount of thought you put into our program and the speeches that you give always leave such an impact on me and inspire me to want to reach my fullest potential. I feel so lucky to have a director like you who cares so deeply about each individual and creates such an open, safe, and loving experience and home for everyone. Cambridge (and me) would not be the same without you. You mean more to us than words can express. Thank you so so much for everything.`},
    {name: `Tara Khoury`, msg: `Dear Mr. Scott, I wanted to take the time to sincerely thank you for the impact you’ve had on not only the ensemble as a whole, but the individuals in it as well. The two years I've had in this program would undoubtedly have been vastly different if it was not under your guidance. Under your leadership, I have been able to grow not only as a performer, but as a person as well. I truly admire your ability to challenge this ensemble, yet balance it with care and love. Your patience, your encouragement, and even your tough love have all made a lasting impact. You’ve created an environment where we feel supported, challenged, and motivated to improve. Your passion for this program is infectious — through every hard rehearsal, pep talk, and competition, I have learned what it means to be part of something larger than myself. Thank you for everything you put into this program and for always supporting us. It truly means a lot. I am proud to be part of this team under your direction and for the opportunities you’ve given us to grow and succeed. Sincerely, Tara Khoury`},
    {name: `Ryann`, msg: `Hii, it so so impressive what you do for your program, how you keep this a community, how you keep us humble and professional yet also hungry. It has been a joy watching you work and will forever be one of my favorite memories.`},
    {name: `Jackson Cardiff`, msg: `Hey Mr. Scott! I wanted to thank you so much for the huge impact you’ve had on my life. One of my favorite things about you is warrior spirit and the passion you put into everything you do. I genuinely admire this trait and try to include it in fitness, school, and I’m looking to include it a lot later in life. I also appreciate the environment you’ve created within the band. Where everyone feels comfortable expressing their thoughts and concerns with you. whether it’s me or anyone else. As life becomes more challenging, I think It’s amazing you do this because it makes me feel good knowing there’s always someone I can talk to. The family culture within the band has made me feel more at ease and confident in myself. Even with my anxiety which I have struggled with a lot at some points, what you have done has really made me barely feel any anxiety in activities like marching band and concert band. I am so grateful to have you in my life and I don’t think I would be in a better place without you. Even when it seems like I don’t, I really do look up to you because you are such a great leader I aspire to be later in life wherever that may be.`},
    {name: `Caroline`, msg: `Hi Mr Scott! I just wanted to say thank you for everything you have done for this program, we appreciate you so much. You are more than just a band director to your students, so don’t forget that we’re all thinking of you. I’m really glad I found someone who finally believed in me, and gave me a chance with a position in this program that I’ll forever be in love with. This community has changed so many people’s lives and it’s all because of you, thank you for all you do to make this such a loving home. The world needs more Mr Scotts. We all love you!!❤️❤️`},
    {name: `Chelsie Silvester`, msg: `As much as you seem to be a guy who “hates children” and “doesn’t want to be here” at the end of the day, we know that you love us so incredibly much. You do so much everyday just  to make sure we have everything we need to be successful and you work so hard to get us to where we need to be and we are so grateful for it. Maybe we don’t show it as much but I know that every single person in the program sees you as this figure who continuously inspires and encourages us to be the best we can be. You really bring out everyone’s individual talents, and help us grow. To me, you’ve always been someone I looked up to and someone I aspire to be. I aspire to be as charismatic, as talented, as confident, as committed to a group of kids as you are. You are one of the educators that truly wishes to see their students thrive and grow, and I see it every day in your word and actions. I, and everyone else who passes through this program, will never leave this place the same because your influence on our lives will be forever lasting. We love you, Mr. Scott!!`},
    {name: `Stella`, msg: `Thank you for being my band coach!`},
    {name: `Santiago Toscano`, msg: `Having you as our chaperone on both Carowinds and Universal was one of the reasons they were so enjoyable! I’m so grateful to have gotten you as my band director. Every day is a new and fun experience in the band room, and I look forward to creating even more memories with you. Love you, Mr. Scott!!`},
    {name: `Andres Ruiz-Portillo`, msg: `Hey Mr. Scott, I wanted to let you know that I really appreciate everything you do for the program and how hard you work for us. Im also thankful for you always being there for me and helping build my confidence. Thanks for all you do!`},
    {name: `Kaelie Meanor`, msg: `I really appreciate everything you do for this program. You helped create a program so welcoming and strong that it is hard leaving and I will miss everything so much. You are so passionate and so caring of others that it feels like Cambridge band is just one big family. Happy Thanksgiving Mr Scott and I hope you have a great week!`},
    {name: `Drew Neal`, msg: `I’m so grateful you offer us so many opportunities in band. I enjoy getting to explore every aspect of this activity, and I couldn’t have known all these amazing things if we had a band director that wasn’t as dedicated as you are. It’s helped me find my place in the world and it’s helped me prepare for my future. It has helped me a lot to have a band director who, in particular, has been accepting of me and supportive. It’s hard to find people in the world that I feel safe around and that I can confide in. The past few years I’ve dealt with so much criticism for my identity, even sometimes within my own (extended, usually) family. It feels unbearable to be treated like trash, or like a dog, because of who I am. I know that almost nobody, friends or strangers, would stick up for me if I was in danger. I know that a lot of people could care less if I was killed or not. I know that, because it happens, and I’m just met with a shrug of the shoulders most of the time. It’s unbearable to have strings tied to me by people around me who are trying to drag me in the direction they want me to go, yet I physically can’t let myself fall down the path that won’t make me happy. Having your support has made a difference for me, though. You could have shrugged your shoulders at me too, or could’ve also said that calling me he/him pronouns was lying, or could’ve cussed me out of the program on the band ramp. But you didn’t, and you were there to stick up for me when almost nobody else was. Even if there is no “safe space” for me in the world, I know that I can always confide in you and be authentic around you, and I don’t have to worry about being met with negativity. I am very lucky to have you in my life.`},
    {name: `Sandra Pavia`, msg: `hi mr scott!! i don’t really know how to put my thoughts into words but i’m going to try my best. you are honestly one of the best teachers i've ever had for so many reasons that i cannot even name. you value each and every one of your students without fail and you see good in all of them. i don’t know if i can speak for others, but you can always make me laugh. (even if i'm upset) i will never walk in your shoes and you will never walk in mine, but as long as i am your student, you will always have someone looking up to you!`},
    {name: `Brooklyn Aronson`, msg: `Thank you for being patient with me during band camp and teaching me a lot of good things.`},
    {name: `Laura Shaner`, msg: `Mr. Scott, I can’t express how lucky I am to have you as a band director…. Buy imma try!! You are so kind and this program is made everything it is because of you. Thank you so much for everything you do and how awesome you are!!!!`},
    {name: `Lauren Ollis`, msg: `I love you so much Mr Scott thank you for making my first season of color guard amazing. I enjoyed marching band so much, I didn’t think I wanted to do it but I enjoy it so much and I will do color and marching band for the rest of my days in highschool. Thanks to color guard people and to you for making this season and more amazing. Thank you so so much and I will enjoy every year of marching band with you. Thank you so much! We love you!`},
    {name: `Olivia adeyemi`, msg: `THANK YOU FOR MAKING THIS SEASON SO FUNNN`},
    {name: `Annie Renner`, msg: `Thank you for everything you do!! Our program would not be the same without all you do!! Thank you!!`},
    {name: `Miller Bragg`, msg: `Thank you for supporting me since 8th grade and watching me grow as a person and help me out along the way. Ill always remember how you and the Cambridge Band changed the trajectory of my life.`},
    {name: `Sydney Jaeger`, msg: `I appreciate everything you do for us. Your patience, passion, and dedication make such a huge difference, and it shows every time we step on the field or into the band room. Thank you for pushing us to be better musicians, better teammates, and better people. I’m truly grateful for all the time and energy you put into helping us grow. Thank you for believing in us and for making band a place where we can challenge ourselves, have fun, and feel proud of what we accomplish. You mean more to this program than you know.`},
    {name: `Shreya Upadhyay`, msg: `Hi Mr. Scott, i’m really grateful for all your work into making our band program the best to ever exist. The program means so much to me and for you to put the amount of effort you do into it means so much to all of us. You have taught me so much about music, obviously, but also life and i’ve learned so many life lessons from you. Thank you for all you have done, have a great thanksgiving.`},
    {name: `Ayaan Gadre`, msg: `Thank you so much Mr. Scott for being a great band director!`},
    {name: `Sanadi`, msg: `I just wanted to thank you for everything. Being in your band class has meant more to me than I can really express. I had mixed feelings about band in middle school, but after meeting you and joining your class, it completely changed perspective about band. I truly enjoy playing music, and honestly band class is the best part of my day. Marching band pushed me in ways I never expected, and there were days when it was tiring, stressful, or overwhelming. But you always encouraged us, kept us focused, and reminded us that we’re Cambridge. I’m really proud of how far I’ve come, and I know I couldn’t have done it without your leadership. But one moment that will always stay with me was your pep talk after we lose a competition. I remember how disappointed we all felt, but you reminded us that our hard work mattered. Your vibe and personality is the best thing about you. Ur always energetic, funny, and able to make us laugh all the time and it makes band feel so enjoyable. Thank you for being such an inspiring teacher.`},
    {name: `Tylar Markwell`, msg: `Thank for making sure the band doesn’t fall apart`},
    {name: `anya`, msg: `hi Mr. Scott! I don't really know if I can put into words how much I appreciate what you've done for both the program and me, but I'll try. The culture you've built and your values have definitely made me a better person. I know I wouldn't be the person I am today without you. Even though sometimes it's been a struggle, you've been there to support all of us in different ways, and some of those moments have stuck with me. From the effort you made to get to know us 8th graders to supporting us throughout our high school careers, you've been one of the most influential people in my life. I can't thank you enough for how much you've helped me grow and learn. I can't express how much it means to me enough.`},
    {name: `Rebecca Luth`, msg: `Thank you for everything these past three years, Cambridge Band wouldn't have come as far as it has without you. You inspire all of us and I'm so thankful for you. I can't wait to see where the future takes this program and where your creative thinking goes next.`},
    {name: `Drew w`, msg: `Thank you for pushin me to reach my potential and supporting me though my journey. Im so thankful to have such an incredible teacher showing me the way to success. I used to not do things you say, but realized that everything you say is essential in the music world. I can always learn from you and grow from you and always will. Thank you.`},
];

// generate a randomized mapping of colors for the notes so colors are distributed randomly
let colorMap = generateColorMap(notes.length);

function generateColorMap(len){
  // build array of color indices 1..6 repeated to cover len
  const base = [];
  for(let i=0;i<len;i++) base.push((i % 6) + 1);
  // shuffle (Fisher-Yates)
  for(let i=base.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    const tmp = base[i]; base[i] = base[j]; base[j] = tmp;
  }
  return base;
}

// control note (separate, not part of notes array). give it a class so it won't be included in explode/implode
const controlEl = document.createElement('div');
controlEl.className = 'note control';
controlEl.innerHTML = `<div class="body">${escapeHtml(controlNote.msg)}</div><div class="meta"></div>`;
controlEl.dataset.index = 'control';
// position control on top and give it a slight rotation
controlEl.style.transform = `translate(-50%,-50%) rotate(0deg)`;
// ensure it's visually on top
controlEl.style.zIndex = 9999;
// style control background distinct (use note1)
controlEl.style.background = `var(--note1)`;

// helper: create a single note DOM element
function createNoteEl(note, i){
  const el = document.createElement('div');
  el.className = 'note';
  el.innerHTML = `<div class="body">${escapeHtml(note.msg)}</div><div class="meta">${escapeHtml(note.name||'')}</div>`;
  // give an initial stacked transform (slight random rotation)
  const rotation = (Math.random()*8 - 4).toFixed(2); // -4deg to +4deg
  const offsetX = (Math.random()*8 - 4).toFixed(2);
  const offsetY = (Math.random()*8 - 4).toFixed(2);
  el.style.transform = `translate(-50%,-50%) rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`;
  el.dataset.index = i;
  // assign a background color from the randomized colorMap
  const colorIndex = colorMap[i % colorMap.length] || 1;
  el.style.background = `var(--note${colorIndex})`;
  return el;
}

function renderStack(stackEl){
  if(!stackEl) return;
  stackEl.innerHTML = '';
  // add control note on top (rendered last so it appears visually on top)
  // first render the regular notes
  for(let i=0;i<notes.length;i++){
    const el = createNoteEl(notes[i], i);
    stackEl.appendChild(el);
  }

  stackEl.appendChild(controlEl);
  return controlEl; // return control element for wiring
}

// random positions for exploded layout
function randomExplodePosition(i, count, stackW, stackH){
  // Use a golden-angle (phyllotaxis) spiral but scale to the available stack area
  // so notes are distributed across the full note area rather than a fixed radius.
  const golden = Math.PI * (3 - Math.sqrt(5)); // ~2.399963
  const jitterAngle = (Math.random() - 0.5) * 0.4; // small random angle jitter

  // Determine available radius based on stack dimensions and note size
  const noteW = 13 * 16; // px (match styles.css new width)
  const noteH = 11 * 16;   // px
  const padding = 24; // padding from edges

  // half-available extents
  const maxX = Math.max((stackW / 2) - noteW / 2 - padding, 20);
  const maxY = Math.max((stackH / 2) - noteH / 2 - padding, 20);
  // use the smaller dimension to keep notes on-screen
  const maxR = Math.max(20, Math.min(maxX, maxY));

  // map index to radius fraction (0..1) using sqrt for tighter center, spread outward
  const frac = Math.sqrt((i + 1) / Math.max(1, count));
  const centerGap = Math.min(120, maxR * 0.15);
  const r = centerGap + (maxR - centerGap) * frac;

  const angle = i * golden + jitterAngle;
  const x = Math.cos(angle) * r;
  const y = Math.sin(angle) * r * 0.8; // slight vertical squeeze for aesthetics
  const rot = (Math.random() * 36 - 18).toFixed(2);
  return {x, y, rot};
}

// Relax positions to reduce overlaps using a simple iterative repulsion pass.
function relaxPositions(noteEls, positions, controlEl, iterations = 15){
  if(!noteEls || !positions) return positions;

  // note dimensions from CSS (13rem width, 11rem min-height)
  // convert rem to px (assuming 1rem = 16px)
  const noteW = 13 * 16; // 208px (updated to match styles.css)
  const noteH = 11 * 16;   // 176px
  const controlW = noteW;
  const controlH = noteH;

  const n = noteEls.length;
  const margin = 20; // extra spacing between notes (increased)

  for(let iter=0; iter<iterations; iter++){
    // pairwise pushes
    for(let i=0;i<n;i++){
      for(let j=i+1;j<n;j++){
        let dx = positions[j].x - positions[i].x;
        let dy = positions[j].y - positions[i].y;
        const dist = Math.hypot(dx, dy) || 0.1;

        // minimum distance to avoid overlap (half-widths + margin)
        const minDist = (noteW / 2 + noteW / 2 + margin);

        if(dist < minDist){
          // they overlap; push them apart
          const ux = dx / dist;
          const uy = dy / dist;
          const overlap = minDist - dist;
          const push = overlap * 0.6; // aggressive push
          positions[j].x += ux * push;
          positions[j].y += uy * push;
          positions[i].x -= ux * push;
          positions[i].y -= uy * push;
        }
      }

      // also push away from control note (center)
      {
        const cx = positions[i].x;
        const cy = positions[i].y;
        const controlDist = Math.hypot(cx, cy) || 0.1;
        const minControlDist = (noteW / 2 + controlW / 2 + margin + 30); // bigger gap for control

        if(controlDist < minControlDist){
          const ux = cx / controlDist;
          const uy = cy / controlDist;
          const overlap = minControlDist - controlDist;
          const push = overlap * 0.8; // push away strongly from control
          positions[i].x += ux * push;
          positions[i].y += uy * push;
        }
      }
    }
  }

  return positions;
}

function explode(stackEl, controlEl){
  if(!stackEl) return;
  // only consider the real notes (exclude .control)
  const noteEls = Array.from(stackEl.querySelectorAll('.note:not(.control)'));
  const count = noteEls.length;
  if(count === 0) return;

  // compute stack dimensions and build initial positions scaled to the stack size
  const stackRect = stackEl.getBoundingClientRect();
  const stackWidth = stackRect.width || window.innerWidth;
  const stackHeight = stackRect.height || window.innerHeight;
  const positions = noteEls.map((el, idx) => {
    const pos = randomExplodePosition(idx, count, stackWidth, stackHeight);
    return { x: pos.x, y: pos.y, rot: pos.rot };
  });

  // run relaxation to reduce overlaps (this mutates positions)
  relaxPositions(noteEls, positions, controlEl, 12);

  // clamp positions to stay on-screen (within .stack bounds)
  const noteW = 13 * 16; // 208px
  const noteH = 11 * 16;   // 176px
  const padding = 10;

  positions.forEach(p => {
    // clamp x: note center must stay within stack bounds accounting for note half-width
    p.x = Math.max(-stackWidth / 2 + noteW / 2 + padding, 
           Math.min(stackWidth / 2 - noteW / 2 - padding, p.x));
    // clamp y: note center must stay within stack bounds accounting for note half-height
    p.y = Math.max(-stackHeight / 2 + noteH / 2 + padding, 
           Math.min(stackHeight / 2 - noteH / 2 - padding, p.y));
  });

  // animate each element to its final position with a small stagger
  noteEls.forEach((el, idx) => {
    const p = positions[idx];
    const delay = idx * 60; // slightly tighter stagger
    setTimeout(() => {
      el.style.transition = 'transform 700ms cubic-bezier(.2,.9,.2,1), opacity 400ms';
      el.style.transform = `translate(${Math.round(p.x)}px, ${Math.round(p.y)}px) rotate(${p.rot}deg)`;
      el.style.opacity = 1;
    }, delay);
  });

  controlEl.style.zIndex = 999;
}

function implode(stackEl){
  if(!stackEl) return;
  const noteEls = Array.from(stackEl.querySelectorAll('.note:not(.control)'));
  noteEls.forEach((el, idx)=>{
    const delay = idx * 40;
    setTimeout(()=>{
      // reset to stacked random small rotations again
      const rotation = (Math.random()*8 - 4).toFixed(2);
      const offsetX = (Math.random()*8 - 4).toFixed(2);
      const offsetY = (Math.random()*8 - 4).toFixed(2);
      el.style.transform = `translate(-50%,-50%) rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`;
      el.style.opacity = 1;
    }, delay);
  });

  controlEl.style.zIndex = 9999;
}
// toggle explosion - wired after DOM ready

// render grid of notes (fallback/readable)
function renderGrid(notesGrid){
  notesGrid.innerHTML = '';
  notes.forEach((n, i)=>{
    const item = document.createElement('div');
    item.className = 'note-grid-item';
    // keep color consistent with stack: map index -> --note1..6
    const colorIndex = colorMap[i % colorMap.length] || 1;
    item.style.background = `var(--note${colorIndex})`;
    item.innerHTML = `<div style="font-family:Inter, sans-serif;font-size:12px;color:#5b504a">${escapeHtml(n.name||'')}</div><div style="font-family:Caveat, cursive;font-size:16px">${escapeHtml(n.msg)}</div>`;
    notesGrid.appendChild(item);
  });
}

// escape helper
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; });
}

// Init wiring after DOM ready so elements exist
document.addEventListener('DOMContentLoaded', ()=>{
  // run gallery rotation
  rotateGalleryItems();

  const stackEl = document.querySelector('.stack');
  const explodeBtn = document.querySelector('.explodeBtn');
  const notesGrid = document.querySelector('.notes-grid');

  // render initial stacked notes and return control element
  const controlEl = renderStack(stackEl);

  // attach control click on the control note instead of a separate reveal button
    if(controlEl){
    controlEl.style.cursor = 'pointer';
    controlEl.addEventListener('click', ()=>{
        exploded = !exploded;
        if(exploded){
        stackEl.classList.add('exploded');
        // pass controlEl so relaxPositions pushes notes away from it
        explode(stackEl, controlEl);
        // show grid after a short delay
        setTimeout(()=>{ notesGrid.classList.remove('hidden'); renderGrid(notesGrid); }, 700);
        } else {
        stackEl.classList.remove('exploded');
        implode(stackEl);
        setTimeout(()=>{ notesGrid.classList.add('hidden'); }, 800);
        }
    });
    }

  // render initial readable grid (hidden by default)
  if(notesGrid) renderGrid(notesGrid);
});
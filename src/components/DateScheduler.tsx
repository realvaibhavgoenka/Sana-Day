import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  Heart,
  Sparkles,
  MapPin,
  Utensils,
  CheckCircle2,
  PartyPopper,
  CalendarPlus,
  ExternalLink,
  Loader2,
  Wine,
  Flower2,
  Cake,
  Edit3,
  UserCheck,
} from 'lucide-react';
import { AppConfig, DatePlanResponse } from '../types';
import { getDateResponse, saveDateResponse } from '../utils/storage';
import { SingleLilySVG } from './LilyFlowerSVG';
import {
  signInWithGoogleCalendar,
  addEventToGoogleCalendarApi,
  getGoogleCalendarWebLink,
  CalendarEventParams,
} from '../utils/googleCalendar';

interface Props {
  config: AppConfig;
}

// Playful pleading messages for the "NO" button
const PLEADING_MESSAGES = [
  "No, I don't want to go 🥺",
  "Wait... are you sure? 🥺",
  "Pretty please with pink lilies on top? 🌸",
  "I already reserved the best table for us! 🕯️",
  "I promise to buy you all your favorite boba & desserts! 🧋🍰",
  "Please say yes, my heart can't take a no! 💔",
  "You can't say no to your favorite person! 😜💕",
  "Pretty please? I'm literally begging on my knees! 🙇‍♂️💖",
  "Click the big YES button instead! 👉💖",
];

export const DateScheduler: React.FC<Props> = ({ config }) => {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('07:00 PM');
  const [specialNote, setSpecialNote] = useState<string>('');

  const [savedPlan, setSavedPlan] = useState<DatePlanResponse | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Playful begging button states
  const [noButtonCount, setNoButtonCount] = useState<number>(0);
  const [yesScale, setYesScale] = useState<number>(1);
  const [buttonPosOffset, setButtonPosOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Google Calendar API states
  const [isCalendarLoading, setIsCalendarLoading] = useState<boolean>(false);
  const [calendarAdded, setCalendarAdded] = useState<boolean>(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);
  const [calendarEventLink, setCalendarEventLink] = useState<string | null>(null);

  useEffect(() => {
    const existing = getDateResponse();
    if (existing) {
      setSavedPlan(existing);
      setDate(existing.date);
      setTime(existing.time);
      setSpecialNote(existing.specialNote);
    } else {
      // Default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [config]);

  const fireCelebrateConfetti = () => {
    try {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F06292', '#D81B60', '#64B5F6', '#FCE4EC', '#FFD54F'],
      });
    } catch (e) {
      console.log('Confetti triggered', e);
    }
  };

  // Handle when she hovers or clicks the playful "No" button
  const handleNoInteraction = () => {
    setNoButtonCount((prev) => prev + 1);
    setYesScale((prev) => Math.min(prev + 0.12, 1.6));

    // Shift button position slightly sideways/downwards away from YES button so it NEVER overlaps or goes under
    const randomX = (Math.random() - 0.5) * 80;
    const randomY = Math.random() * 30; // Only move downwards or stay level, never up into the YES button
    setButtonPosOffset({ x: randomX, y: randomY });
  };

  const handleConfirmDate = () => {
    if (!date || !time) return;

    const newResponse: DatePlanResponse = {
      date,
      time,
      activity: 'Our Special First Date 💕',
      location: 'Our Special Date Spot 🌸',
      food: 'Favorite Food & Treats 🥂',
      specialNote,
      submittedAt: new Date().toLocaleString(),
    };

    saveDateResponse(newResponse);
    setSavedPlan(newResponse);
    setIsEditing(false);
    fireCelebrateConfetti();
  };

  // Google Calendar Integration
  const eventParams: CalendarEventParams = {
    title: `First Date with ${config.boyfriendName} 💖`,
    description: `Our Special First Date! 💕\n\nSpecial Request / Note: "${specialNote || 'Can\'t wait for our date!'}"`,
    location: 'Our Special Date Spot 🌸',
    startDateStr: date || '2026-08-01',
    timeStr: time || '07:00 PM',
    durationHours: 3,
  };

  const webCalendarLink = getGoogleCalendarWebLink(eventParams);

  const handleSyncToGoogleCalendar = async () => {
    setIsCalendarLoading(true);
    setCalendarError(null);
    try {
      const { accessToken } = await signInWithGoogleCalendar();
      const createdEvent = await addEventToGoogleCalendarApi(accessToken, eventParams);
      setCalendarAdded(true);
      if (createdEvent.htmlLink) {
        setCalendarEventLink(createdEvent.htmlLink);
      }
      fireCelebrateConfetti();
    } catch (err: any) {
      console.error('Calendar error:', err);
      setCalendarError(err.message || 'Could not sync to Google Calendar. You can use the direct link below!');
    } finally {
      setIsCalendarLoading(false);
    }
  };

  const currentNoMessage = PLEADING_MESSAGES[noButtonCount % PLEADING_MESSAGES.length];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full bg-[#FFF9FB]/95 backdrop-blur-md rounded-[40px] p-6 md:p-10 shadow-xl border-2 border-[#FCE4EC] text-[#744F4F] relative"
      >
        {/* Washi tapes */}
        <div className="washi-tape -top-3 left-12" />
        <div className="washi-tape-blue -top-3 right-12" />

        {/* Decorative lilies */}
        <div className="absolute top-4 left-4 opacity-70">
          <SingleLilySVG color="pink" size={38} />
        </div>
        <div className="absolute top-4 right-4 opacity-70">
          <SingleLilySVG color="blue" size={38} />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <span className="px-3.5 py-1.5 bg-[#FDF0F3] text-[#AD1457] text-xs font-bold rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 border border-[#FCE4EC]">
            <Sparkles className="w-3.5 h-3.5 text-[#F06292]" />
            First Date Invitation
            <Sparkles className="w-3.5 h-3.5 text-[#F06292]" />
          </span>
          <h2 className="text-2xl md:text-4xl font-serif italic font-bold text-[#D81B60] mt-3">
            Sana, Will You Go On A First Date With Me? 💖
          </h2>
          <p className="text-xs md:text-sm text-[#744F4F] font-medium mt-1">
            Pick your preferred date & time. You can also sync it directly to Google Calendar!
          </p>
        </div>

        {/* SHOW CONFIRMATION & GOOGLE CALENDAR VOUCHER IF SAVED & NOT EDITING */}
        {savedPlan && !isEditing ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[32px] p-6 md:p-8 border-2 border-[#FCE4EC] shadow-xl text-center relative overflow-hidden"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E3F2FD] text-[#64B5F6] text-xs font-bold rounded-full mb-4 border border-[#E1F5FE]">
              <CheckCircle2 className="w-4 h-4 text-[#64B5F6]" />
              It's Official — First Date Invitation Confirmed!
            </div>

            <h3 className="font-serif italic text-2xl md:text-3xl font-bold text-[#D81B60]">
              It's A Date, {config.girlfriendName}! 🥂✨
            </h3>
            <p className="text-xs text-[#F06292] font-medium mt-1">
              Confirmed on {savedPlan.submittedAt}
            </p>

            {/* Voucher Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-left bg-[#FDF0F3] p-6 rounded-2xl border border-[#FCE4EC]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F06292] text-white flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#AD1457] uppercase tracking-wider">Date</p>
                  <p className="font-bold text-[#744F4F] text-sm">{savedPlan.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#64B5F6] text-white flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#AD1457] uppercase tracking-wider">Time</p>
                  <p className="font-bold text-[#744F4F] text-sm">{savedPlan.time}</p>
                </div>
              </div>

              {savedPlan.specialNote && (
                <div className="sm:col-span-2 pt-3 border-t border-[#FCE4EC]">
                  <p className="text-[11px] font-bold text-[#AD1457] uppercase tracking-wider">Sana's Note for Vaibhav</p>
                  <p className="text-sm italic font-serif text-[#744F4F] mt-0.5">"{savedPlan.specialNote}"</p>
                </div>
              )}
            </div>

            {/* Google Calendar Section */}
            <div className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-[#FFF9FB] to-[#FDF0F3] border-2 border-[#FCE4EC] text-center">
              <div className="flex items-center justify-center gap-2 text-[#D81B60] font-serif italic font-bold text-lg mb-1">
                <CalendarPlus className="w-5 h-5 text-[#F06292]" />
                <span>Schedule On Google Calendar 📅</span>
              </div>
              <p className="text-xs text-[#744F4F] font-medium mb-4 max-w-md mx-auto">
                Add our date directly to your Google Calendar so you get automatic reminders!
              </p>

              {calendarAdded ? (
                <div className="p-4 rounded-2xl bg-[#E3F2FD] border border-[#64B5F6]/30 text-[#64B5F6] text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#64B5F6]" />
                    <span>Added to your Google Calendar!</span>
                  </div>
                  {calendarEventLink && (
                    <a
                      href={calendarEventLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 underline text-[#D81B60] hover:text-[#AD1457]"
                    >
                      View Event <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleSyncToGoogleCalendar}
                    disabled={isCalendarLoading}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#D81B60] hover:bg-[#AD1457] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isCalendarLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Syncing Calendar...</span>
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4" />
                        <span>Sign In & Auto-Add To Google Calendar</span>
                      </>
                    )}
                  </button>

                  <a
                    href={webCalendarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-[#FDF0F3] text-[#D81B60] border-2 border-[#FCE4EC] text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-[#F06292]" />
                    <span>Open One-Click Calendar Link</span>
                  </a>
                </div>
              )}

              {calendarError && (
                <p className="text-xs text-rose-500 font-medium mt-2">
                  {calendarError}
                </p>
              )}
            </div>

            {/* Change or celebrate again */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 rounded-full bg-[#FDF0F3] hover:bg-[#FCE4EC] text-[#D81B60] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-[#FCE4EC]"
              >
                <Edit3 className="w-4 h-4" />
                Change Date / Time
              </button>
              <button
                onClick={fireCelebrateConfetti}
                className="px-6 py-2.5 rounded-full bg-[#F06292] hover:bg-[#D81B60] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <PartyPopper className="w-4 h-4" />
                Celebrate Again 🎉
              </button>
            </div>
          </motion.div>
        ) : (
          /* PROPOSAL & SCHEDULER FORM */
          <div className="space-y-6">
            {/* Date & Time Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#FCE4EC] shadow-sm">
                <label className="block text-xs font-bold text-[#AD1457] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#F06292]" />
                  When Are You Free? (Select Date)
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#FCE4EC] focus:outline-none focus:ring-2 focus:ring-[#F06292] font-medium text-[#744F4F] text-sm bg-[#FFF9FB]"
                />
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#FCE4EC] shadow-sm">
                <label className="block text-xs font-bold text-[#AD1457] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#64B5F6]" />
                  What Time Works Best?
                </label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. 07:00 PM"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#FCE4EC] focus:outline-none focus:ring-2 focus:ring-[#F06292] font-medium text-[#744F4F] text-sm bg-[#FFF9FB]"
                />
              </div>
            </div>

            {/* Special Requests */}
            <div className="bg-white p-5 rounded-2xl border border-[#FCE4EC] shadow-sm">
              <label className="block text-xs font-bold text-[#AD1457] uppercase tracking-wide mb-2">
                Special Requests or Favorite Song For The Ride 🎶
              </label>
              <textarea
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="Any favorite song to play in the car, or special outfit color request?"
                rows={2}
                className="w-full p-3 rounded-xl border border-[#FCE4EC] focus:outline-none focus:ring-2 focus:ring-[#F06292] text-xs text-[#744F4F] bg-[#FFF9FB]"
              />
            </div>

            {/* PROPOSAL ACTION BUTTONS (YES vs PLAYFUL BEGGING NO BUTTON) */}
            <div className="pt-4 text-center space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[110px] pb-2">
                {/* BIG PULSING YES BUTTON */}
                <motion.button
                  style={{ scale: yesScale }}
                  whileHover={{ scale: yesScale * 1.05 }}
                  whileTap={{ scale: yesScale * 0.95 }}
                  onClick={handleConfirmDate}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#F06292] to-[#D81B60] text-white font-bold text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 z-10 shrink-0"
                >
                  <Heart className="w-5 h-5 fill-current animate-bounce text-white" />
                  <span>YES! IT'S A DATE 💖</span>
                  <Sparkles className="w-4 h-4" />
                </motion.button>

                {/* PLAYFUL BEGGING NO BUTTON */}
                <motion.button
                  animate={{ x: buttonPosOffset.x, y: buttonPosOffset.y }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  onMouseEnter={handleNoInteraction}
                  onClick={handleNoInteraction}
                  className="px-5 py-3 rounded-full bg-white hover:bg-[#FDF0F3] text-[#744F4F] font-bold text-xs shadow-md border-2 border-[#FCE4EC] transition-colors cursor-pointer z-20 hover:border-[#F06292] hover:text-[#D81B60]"
                >
                  <span>{currentNoMessage}</span>
                </motion.button>
              </div>

              {noButtonCount > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-[#D81B60] font-serif italic font-semibold"
                >
                  {noButtonCount >= 5
                    ? "See how much the YES button is growing? You're going on a date with me! 🥰✨"
                    : "I'm requesting and pleading... please click YES! 🥺💕"}
                </motion.p>
              )}

              {savedPlan && isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="block mx-auto text-xs text-[#744F4F]/70 hover:underline cursor-pointer font-medium pt-2"
                >
                  Cancel editing & keep previous date plan
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

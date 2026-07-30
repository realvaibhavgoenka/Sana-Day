import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings,
  X,
  Upload,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Heart,
  FileText,
  Image as ImageIcon,
  User,
  Sparkles,
  Film,
} from 'lucide-react';
import { AppConfig, PhotoMemory } from '../types';
import { saveAppConfig, resetAppConfig } from '../utils/storage';

interface Props {
  config: AppConfig;
  onUpdateConfig: (newConfig: AppConfig) => void;
}

export const CustomizeModal: React.FC<Props> = ({ config, onUpdateConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'letter' | 'reel' | 'photos'>('general');
  const [formData, setFormData] = useState<AppConfig>(config);

  const handleOpen = () => {
    setFormData(config);
    setIsOpen(true);
  };

  const handleSave = () => {
    saveAppConfig(formData);
    onUpdateConfig(formData);
    setIsOpen(false);
  };

  const handleReset = () => {
    if (confirm('Reset all content back to original defaults?')) {
      resetAppConfig();
      window.location.reload();
    }
  };

  // Image file upload converter
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          const updated = [...formData.memories];
          updated[index] = { ...updated[index], url: result };
          setFormData({ ...formData, memories: updated });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = () => {
    const newMem: PhotoMemory = {
      id: `mem-${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
      title: 'New Memory',
      date: 'Today',
      note: 'Enter your special memory note here...',
    };
    setFormData({ ...formData, memories: [...formData.memories, newMem] });
  };

  const handleRemoveMemory = (index: number) => {
    const updated = formData.memories.filter((_, i) => i !== index);
    setFormData({ ...formData, memories: updated });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-4 right-4 z-40 px-4 py-2.5 rounded-full bg-[#744F4F]/90 hover:bg-[#744F4F] text-[#FFF9FB] text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-xl border border-[#FCE4EC]/40 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
        title="Customize photos, text, and settings"
      >
        <Settings className="w-4 h-4 animate-spin-slow text-[#F06292]" />
        <span>Customize Site Content</span>
      </button>

      {/* Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#744F4F]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FFF9FB] rounded-[32px] max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border-2 border-[#FCE4EC] overflow-hidden text-[#744F4F]"
            >
              {/* Modal Header */}
              <div className="p-5 bg-[#D81B60] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#FCE4EC]" />
                  <div>
                    <h3 className="font-serif italic font-bold text-base">Content Customizer</h3>
                    <p className="text-[11px] text-[#FCE4EC]">
                      Update photos, love letter, names & cards directly
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-[#FCE4EC] bg-[#FDF0F3] p-2 gap-1 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeTab === 'general' ? 'bg-[#F06292] text-white' : 'text-[#744F4F] hover:bg-[#FCE4EC]'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  Names & Titles
                </button>
                <button
                  onClick={() => setActiveTab('letter')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeTab === 'letter' ? 'bg-[#F06292] text-white' : 'text-[#744F4F] hover:bg-[#FCE4EC]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Love Letter
                </button>
                <button
                  onClick={() => setActiveTab('reel')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeTab === 'reel' ? 'bg-[#F06292] text-white' : 'text-[#744F4F] hover:bg-[#FCE4EC]'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  Instagram Reel Edit
                </button>
                <button
                  onClick={() => setActiveTab('photos')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeTab === 'photos' ? 'bg-[#F06292] text-white' : 'text-[#744F4F] hover:bg-[#FCE4EC]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  Reel Photos ({formData.memories.length})
                </button>
              </div>

              {/* Tab Content Body */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                {/* TAB 1: NAMES & GENERAL */}
                {activeTab === 'general' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Girlfriend's Name
                        </label>
                        <input
                          type="text"
                          value={formData.girlfriendName}
                          onChange={(e) => setFormData({ ...formData, girlfriendName: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-pink-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Your Name / Nickname
                        </label>
                        <input
                          type="text"
                          value={formData.boyfriendName}
                          onChange={(e) => setFormData({ ...formData, boyfriendName: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-pink-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Envelope Welcome Greeting
                      </label>
                      <input
                        type="text"
                        value={formData.envelopeTitle}
                        onChange={(e) => setFormData({ ...formData, envelopeTitle: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-pink-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Bouquet Reveal Heading
                      </label>
                      <input
                        type="text"
                        value={formData.bouquetHeading}
                        onChange={(e) => setFormData({ ...formData, bouquetHeading: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-pink-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Bouquet Subtitle Message
                      </label>
                      <textarea
                        value={formData.bouquetSubheading}
                        onChange={(e) => setFormData({ ...formData, bouquetSubheading: e.target.value })}
                        rows={2}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-pink-400"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: LOVE LETTER */}
                {activeTab === 'letter' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Letter Heading Title
                      </label>
                      <input
                        type="text"
                        value={formData.letterTitle}
                        onChange={(e) => setFormData({ ...formData, letterTitle: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-pink-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Personalized Letter Message Body
                      </label>
                      <textarea
                        value={formData.letterBody}
                        onChange={(e) => setFormData({ ...formData, letterBody: e.target.value })}
                        rows={8}
                        className="w-full p-3 rounded-xl border border-gray-300 text-sm font-serif leading-relaxed focus:ring-2 focus:ring-pink-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Letter Sign-off / Closing
                      </label>
                      <input
                        type="text"
                        value={formData.letterClosing}
                        onChange={(e) => setFormData({ ...formData, letterClosing: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-pink-400"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 3: INSTAGRAM REEL EDIT */}
                {activeTab === 'reel' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Instagram Reel Link
                      </label>
                      <input
                        type="url"
                        value={formData.reelUrl || ''}
                        placeholder="e.g. https://www.instagram.com/reel/C..."
                        onChange={(e) => setFormData({ ...formData, reelUrl: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-pink-400"
                      />
                      <p className="text-[11px] text-gray-500 mt-1">
                        Paste the link to your Instagram Reel to play or embed it in the app!
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Direct Video URL (MP4 / WebM)
                      </label>
                      <input
                        type="url"
                        value={formData.reelVideoUrl || ''}
                        placeholder="e.g. https://my-site.com/video.mp4"
                        onChange={(e) => setFormData({ ...formData, reelVideoUrl: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-pink-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Reel Caption Text
                      </label>
                      <textarea
                        value={formData.reelCaption || ''}
                        onChange={(e) => setFormData({ ...formData, reelCaption: e.target.value })}
                        rows={3}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-pink-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Audio Track Title
                      </label>
                      <input
                        type="text"
                        value={formData.reelAudioTrack || ''}
                        onChange={(e) => setFormData({ ...formData, reelAudioTrack: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-pink-400"
                      />
                    </div>

                    <div className="pt-2 border-t border-gray-200">
                      <label className="block text-xs font-bold text-pink-600 uppercase mb-1">
                        Background Music Audio URL
                      </label>
                      <input
                        type="url"
                        value={formData.musicUrl || ''}
                        placeholder="https://actions.google.com/sounds/v1/ambiences/peaceful_piano.ogg"
                        onChange={(e) => setFormData({ ...formData, musicUrl: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-pink-400"
                      />
                      <p className="text-[11px] text-gray-500 mt-1">
                        Direct audio MP3/OGG link for background romantic music.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-pink-600 uppercase mb-1">
                        Background Music Title
                      </label>
                      <input
                        type="text"
                        value={formData.musicTitle || ''}
                        placeholder="Romantic Piano Ambient"
                        onChange={(e) => setFormData({ ...formData, musicTitle: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-pink-400"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 3: PHOTOS & MEMORIES */}
                {activeTab === 'photos' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600 font-medium">
                        Upload custom photos directly or edit existing memory captions.
                      </p>
                      <button
                        onClick={handleAddMemory}
                        className="px-3 py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        Add New Photo
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formData.memories.map((mem, idx) => (
                        <div
                          key={mem.id}
                          className="p-4 rounded-2xl border border-pink-200 bg-pink-50/40 flex flex-col sm:flex-row gap-4 items-start relative"
                        >
                          {/* Image preview & uploader */}
                          <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden bg-gray-200 relative flex-shrink-0 border border-gray-300">
                            <img
                              src={mem.url}
                              alt={mem.title}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <label className="absolute inset-0 bg-black/40 hover:bg-black/60 text-white flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                              <Upload className="w-5 h-5 mb-1" />
                              <span className="text-[10px] font-bold">Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handlePhotoUpload(e, idx)}
                              />
                            </label>
                          </div>

                          {/* Fields */}
                          <div className="flex-1 space-y-2 w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={mem.title}
                                placeholder="Photo Title"
                                onChange={(e) => {
                                  const updated = [...formData.memories];
                                  updated[idx].title = e.target.value;
                                  setFormData({ ...formData, memories: updated });
                                }}
                                className="p-2 rounded-lg border border-gray-300 text-xs font-bold"
                              />
                              <input
                                type="text"
                                value={mem.date || ''}
                                placeholder="Date / Occasion"
                                onChange={(e) => {
                                  const updated = [...formData.memories];
                                  updated[idx].date = e.target.value;
                                  setFormData({ ...formData, memories: updated });
                                }}
                                className="p-2 rounded-lg border border-gray-300 text-xs"
                              />
                            </div>
                            <textarea
                              value={mem.note}
                              placeholder="Heartfelt memory caption..."
                              rows={2}
                              onChange={(e) => {
                                const updated = [...formData.memories];
                                updated[idx].note = e.target.value;
                                setFormData({ ...formData, memories: updated });
                              }}
                              className="w-full p-2 rounded-lg border border-gray-300 text-xs"
                            />
                            <input
                              type="text"
                              value={mem.url}
                              placeholder="Image URL or Base64"
                              onChange={(e) => {
                                const updated = [...formData.memories];
                                updated[idx].url = e.target.value;
                                setFormData({ ...formData, memories: updated });
                              }}
                              className="w-full p-1.5 rounded-md border border-gray-200 text-[10px] text-gray-500 font-mono"
                            />
                          </div>

                          {/* Remove button */}
                          <button
                            onClick={() => handleRemoveMemory(idx)}
                            className="p-1.5 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors cursor-pointer"
                            title="Remove photo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-[#FDF0F3] border-t border-[#FCE4EC] flex items-center justify-between">
                <button
                  onClick={handleReset}
                  className="px-3.5 py-2 rounded-xl text-[#744F4F]/70 hover:text-[#D81B60] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset to Original
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-xl text-[#744F4F] hover:bg-[#FCE4EC] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 rounded-xl bg-[#F06292] hover:bg-[#D81B60] text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

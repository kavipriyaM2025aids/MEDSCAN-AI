import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Volume2, 
  X, 
  ShieldAlert, 
  Maximize2,
  ChevronDown
} from 'lucide-react';
import { useMedScan } from '../../contexts/MedScanContext';
import { audioService } from '../../utils/audio';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export const AIAssistantChat: React.FC = () => {
  const { 
    isAssistantOpen, 
    setIsAssistantOpen, 
    scannedMedication, 
    activePrescription, 
    inventory, 
    language,
    t 
  } = useMedScan();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: language === 'ta'
        ? "வணக்கம்! நான் உங்கள் AI மருத்துவ மருந்தாளுநர். உங்கள் மருந்துகள், பயன்பாடுகள் மற்றும் மருந்துச்சீட்டு வழிமுறைகள் பற்றி என்னிடம் கேட்கலாம்."
        : (language === 'hi'
          ? "नमस्ते! मैं आपका AI क्लिनिकल फार्मासिस्ट हूँ। आप मुझसे अपनी दवाओं, खुराक और पर्चे के बारे में कुछ भी पूछ सकते हैं।"
          : "Hello! I am your AI Clinical Pharmacist Assistant. Ask me anything about your scanned medications, prescriptions, or active ingredient safety."),
      time: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePromptChips = [
    "What is this medicine used for?",
    "What is the active ingredient?",
    "Why was this medicine prescribed?",
    "How should I understand the prescription instructions?",
    "What medicines are currently in my inventory?"
  ];

  const handleSendMessage = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: queryText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // AI Clinical Pharmacist response logic
    setTimeout(() => {
      let reply = "";
      const q = queryText.toLowerCase();
      const med = scannedMedication;

      if (q.includes("used for") || q.includes("பயன்பாடு") || q.includes("उपयोग")) {
        reply = language === 'ta'
          ? `${med?.name} காய்ச்சல் (Pyrexia) மற்றும் லேசான உடல் வலி, தலைவலியை குறைக்க பயன்படுகிறது.`
          : (language === 'hi'
            ? `${med?.name} बुखार कम करने और सिरदर्द, बदन दर्द से राहत पाने के लिए उपयोग किया जाता है।`
            : `${med?.name} is primarily used for reducing fever (pyrexia) and relieving mild-to-moderate aches, headache, and post-immunization discomfort.`);
      } else if (q.includes("active ingredient") || q.includes("மூலப்பொருள்") || q.includes("सक्रिय घटक")) {
        reply = language === 'ta'
          ? `${med?.name}-ல் உள்ள முதன்மை மூலப்பொருள் ${med?.genericName} (${med?.strength}) ஆகும்.`
          : (language === 'hi'
            ? `${med?.name} का मुख्य सक्रिय सॉल्ट ${med?.genericName} (${med?.strength}) है।`
            : `The active therapeutic pharmaceutical ingredient in ${med?.name} is ${med?.genericName} at a strength of ${med?.strength}.`);
      } else if (q.includes("why was this medicine prescribed") || q.includes("பரிந்துரைக்கப் பட்டது")) {
        reply = language === 'ta'
          ? `டாக்டர் அர்விந்த் ஷர்மா உங்கள் கடுமையான காய்ச்சல் மற்றும் சுவாசக் குழாய் தொற்றை குணப்படுத்த இதை பரிந்துரைத்துள்ளார்.`
          : (language === 'hi'
            ? `डॉ. शर्मा ने आपके तीव्र बुखार और ऊपरी श्वसन पथ के संक्रमण के इलाज के लिए इसे निर्धारित किया है।`
            : `Dr. Arvind Sharma prescribed this to control your elevated body temperature and manage symptoms of acute upper respiratory tract infection.`);
      } else if (q.includes("inventory") || q.includes("இருப்பு") || q.includes("इन्वेंट्री")) {
        const names = inventory.map(i => `${i.name} (${i.countRemaining} doses left)`).join(", ");
        reply = language === 'ta'
          ? `தற்போது உங்கள் இருப்பில் உள்ள மருந்துகள்: ${names}.`
          : (language === 'hi'
            ? `आपकी इन्वेंट्री में वर्तमान दवाएं: ${names}।`
            : `Your active inventory currently contains: ${names}.`);
      } else {
        reply = language === 'ta'
          ? `மருந்துச்சீட்டு வழிமுறைகள்: ${med?.name} மாத்திரையை உணவுக்குப் பின் முழு டம்ளர் தண்ணீருடன் உட்கொள்ள வேண்டும். 24 மணி நேரத்தில் 4000 மி.கி அளவைத் தாண்டக்கூடாது.`
          : (language === 'hi'
            ? `पर्चे के निर्देश: ${med?.name} भोजन के बाद एक गिलास पानी के साथ लें। 24 घंटे में 4000mg से अधिक न लें।`
            : `Prescription Instructions: Take ${med?.name} after meals with a full glass of water. Maintain at least 6 hours between doses and never exceed 4,000 mg in 24 hours.`);
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleSpeakMessage = (text: string) => {
    audioService.speakText(text, language);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide shadow-xl shadow-slate-950/20 transition-all transform hover:scale-105 active:scale-95"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 to-teal-300 flex items-center justify-center text-slate-950">
            <Sparkles className="w-3 h-3 stroke-[2.5]" />
          </div>
          <span>AI Clinical Pharmacist</span>
        </button>
      </div>

      {/* Floating Chat Drawer / Window */}
      {isAssistantOpen && (
        <div className="fixed bottom-20 left-5 z-50 w-96 max-w-[calc(100vw-40px)] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200 max-h-[600px] h-[520px]">
          
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-xs">AI Clinical Pharmacist</div>
                <div className="text-[10px] text-cyan-400 font-mono">Multilingual Gemini Model</div>
              </div>
            </div>

            <button
              onClick={() => setIsAssistantOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200 flex items-center justify-center text-[10px] shrink-0 font-bold">
                    AI
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-[82%] space-y-1.5 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-cyan-600 text-white rounded-br-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <div className="flex items-center justify-between text-[9px] opacity-70">
                    <span>{m.time}</span>
                    {m.sender === 'assistant' && (
                      <button
                        onClick={() => handleSpeakMessage(m.text)}
                        title="Read out loud"
                        className="hover:opacity-100"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400 italic">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"></span>
                <span>AI Clinical Pharmacist is formulating response...</span>
              </div>
            )}
          </div>

          {/* Sample Chips */}
          <div className="px-3 py-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/40 flex items-center gap-1.5 overflow-x-auto">
            {samplePromptChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] font-medium text-slate-600 dark:text-slate-300 hover:border-cyan-400"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputQuery);
              }}
              className="flex items-center gap-2"
            >
              <input 
                type="text"
                placeholder="Ask about active salts, dosage, or instructions..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-0 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};


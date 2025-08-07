import React, { useState, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import './App.css';
import Logo from './components/Logo';
import Tips from './components/Tips';
import LanguageSwitch from './components/LanguageSwitch';
import { useLanguage } from './i18n/LanguageContext';

interface NoteItem {
  title: string;
  content: string[];
  tags: string[];
  style: string;
}

interface NoteData {
  notes: NoteItem[];
  total_notes: number;
  summary: string;
}

function App() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [noteData, setNoteData] = useState<NoteData | null>(null);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const noteCardRef = useRef<HTMLDivElement>(null);
  const { t, tWithParams } = useLanguage();

  const generateNote = async () => {
    if (!inputText.trim()) {
      setError(t('errorTitle'));
      return;
    }

    setIsLoading(true);
    setError('');
    setShowSuccess(false);

    try {
      const response = await axios.post('/api/generate-note', {
        text: inputText,
        style: '小红书风格'
      });

      setNoteData(response.data);
      setShowSuccess(true);
      
      // 3秒后隐藏成功提示
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || t('errorDescription'));
    } finally {
      setIsLoading(false);
    }
  };

  const downloadNote = async (noteIndex: number) => {
    const noteCard = document.getElementById(`note-card-${noteIndex}`);
    if (!noteCard) return;

    try {
      const canvas = await html2canvas(noteCard, {
        scale: 2,
        backgroundColor: null,
        width: 360,
        height: 480
      });

      const link = document.createElement('a');
      link.download = `${t('title')}_${noteIndex + 1}_${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (err) {
      console.error('下载失败:', err);
      alert(t('errorDescription'));
    }
  };

  const downloadAllNotes = async () => {
    if (!noteData || !noteData.notes) return;
    
    for (let i = 0; i < noteData.notes.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500)); // 延迟下载
      await downloadNote(i);
    }
  };

  const handleExampleClick = (example: string) => {
    setInputText(example);
    setError('');
  };

  return (
    <div className="app">
      <LanguageSwitch />
      <div className="container">
        <header className="header">
          <div className="header-content">
            <div className="logo-section">
              <Logo size={50} className="header-logo" />
              <div className="title-section">
                <h1>{t('title')}</h1>
                <p className="subtitle">{t('subtitle')}</p>
              </div>
            </div>
            <div className="header-badge">
              <span className="badge">✨ {t('free')}</span>
              <span className="badge">🚀 {t('fast')}</span>
            </div>
          </div>
        </header>

        <div className="main-content">
          <div className="input-section">
            <div className="input-header">
              <h2>{t('inputHeader')}</h2>
              <p>{t('inputDescription')}</p>
            </div>
            
            <div className="input-group">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t('inputPlaceholder')}
                className="text-input"
                rows={8}
              />
              
              <div className="input-actions">
                <button
                  onClick={generateNote}
                  disabled={isLoading}
                  className="generate-btn"
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      {t('generating')}
                    </>
                  ) : (
                    <>
                      {t('generateButton')}
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setInputText('')}
                  className="clear-btn"
                  disabled={!inputText.trim()}
                >
                  🗑️ {t('clear')}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
            
            {showSuccess && (
              <div className="success-message">
                <span className="success-icon">✅</span>
                {tWithParams('successDescription', { count: noteData?.total_notes || 0 })}
              </div>
            )}
          </div>

          {noteData && (
            <div className="result-section">
              <div className="result-header">
                <h2>🎨 {t('title')} ({noteData.total_notes}张)</h2>
                <p>{noteData.summary}</p>
              </div>
               
               <div className="notes-grid">
                 {noteData.notes?.map((note, noteIndex) => (
                   <div key={noteIndex} className="note-preview">
                     <div className="note-card" id={`note-card-${noteIndex}`}>
                                               <div className="note-header">
                          <div className="note-title">{note.title}</div>
                          <div className="note-subtitle">{t('shareBeautifulLife')}</div>
                        </div>
                       <div className="note-content">
                         {note.content?.map((item, index) => (
                           <div key={index} className="content-item">
                             {item}
                           </div>
                         ))}
                       </div>
                       <div className="note-footer">
                         <div className="tags">
                           {note.tags?.map((tag, index) => (
                             <span key={index} className="tag">
                               {tag}
                             </span>
                           ))}
                         </div>
                       </div>
                                               <div className="watermark">{t('watermark')}</div>
                     </div>
                     
                     <div className="note-actions">
                       <button 
                         onClick={() => downloadNote(noteIndex)} 
                         className="download-single-btn"
                       >
                         {t('downloadSingle')} #{noteIndex + 1}
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
               
               <div className="action-buttons">
                 <button onClick={downloadAllNotes} className="download-all-btn">
                   {t('downloadAll')}
                 </button>
                                   <button 
                    onClick={() => setNoteData(null)} 
                    className="reset-btn"
                  >
                    🔄 {t('regenerate')}
                  </button>
               </div>
             </div>
           )}

           <Tips />

           <footer className="footer">
            <div className="footer-content">
              <p>{t('footerDescription')}</p>
              <div className="footer-links">
                <span>{t('footerLinks.0')}</span>
                <span>{t('footerLinks.1')}</span>
                <span>{t('footerLinks.2')}</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App; 
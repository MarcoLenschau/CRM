"use client";
import React, { useState } from 'react';

export default function TwoFactorSetup({ userId }: { userId: string }) {
  const [otpauthUrl, setOtpauthUrl] = useState('');
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState('');
  const [valid, setValid] = useState<boolean | null>(null);
  const [step, setStep] = useState<'init' | 'qr' | 'confirm' | 'done'>('init');

  const handleActivate = async () => {
    const res = await fetch('/api/totp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    const data = await res.json();
    setOtpauthUrl(data.otpauth);
    setSecret(data.secret);
    setStep('qr');
  };

  const handleVerify = async () => {
    const res = await fetch('/api/totp', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, token })
    });
    const data = await res.json();
    setValid(data.valid);
    if (data.valid) {
      // Secret speichern (Mock):
      await fetch('/api/totp/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, secret })
      });
      setStep('done');
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-bold text-white">Zwei-Faktor-Authentifizierung (TOTP)</h4>
      {step === 'init' && (
        <button onClick={handleActivate} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">2FA aktivieren</button>
      )}
      {step === 'qr' && otpauthUrl && (
        <div>
          <p className="text-gray-300 mb-2">Scanne diesen QR-Code mit deiner Authenticator-App:</p>
          <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(otpauthUrl)}&size=200x200`} alt="QR-Code" />
          <p className="text-xs text-gray-400 mt-2">Secret: {secret}</p>
          <div className="mt-4">
            <input
              type="text"
              placeholder="TOTP-Code eingeben"
              value={token}
              onChange={e => setToken(e.target.value)}
              className="bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400"
            />
            <button onClick={handleVerify} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold ml-2">Code prüfen</button>
            {valid !== null && (
              <div className={valid ? 'text-green-500' : 'text-red-500 mt-2'}>
                {valid ? 'Code korrekt! Secret gespeichert.' : 'Code falsch!'}
              </div>
            )}
          </div>
        </div>
      )}
      {step === 'done' && (
        <div className="text-green-500 font-semibold">2FA erfolgreich aktiviert!</div>
      )}
    </div>
  );
}

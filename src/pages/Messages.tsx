// src/components/Messages.tsx
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import {
  Search,
  Edit,
  Send,
  Phone,
  Video,
  Info,
  Image,
} from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';

type ChatMessage = {
  user: { id: string; fullName: string; avatar: string };
  text?: string;
  fileUrl?: string;
  timestamp: number;
};

type Conversation = {
  id: string;
  user: { id: string; fullName: string; avatar: string };
  lastMessage: string;
  timestamp: number;
  unread: number;
};

const SOCKET_URL = 'http://localhost:3001';
const UPLOAD_URL = 'http://localhost:3001/upload';

const Messages: React.FC = () => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvo, setSelectedConvo] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMsg, setNewMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- 1) SETUP SOCKET.IO ---
  useEffect(() => {
    const sock = io(SOCKET_URL);
    setSocket(sock);

    sock.on('chatMessage', (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
      // optionally update conversations list
    });

    // WebRTC signalling events would go here...
    // sock.on('call-made', handleIncomingOffer);
    // sock.on('answer-made', handleIncomingAnswer);
    // sock.on('ice-candidate', handleIncomingICE);

    return () => {
      sock.disconnect();
    };
  }, []);

  // --- 2) FILTER CONVERSATIONS ---
  const filtered = conversations.filter((c) =>
    c.user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- 3) SEND TEXT MESSAGE ---
  const sendText = (e: FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim() || !socket || !selectedConvo) return;

    const payload: ChatMessage = {
      user: { id: user!.id, fullName: user!.fullName, avatar: '' },
      text: newMsg.trim(),
      timestamp: Date.now(),
    };
    socket.emit('chatMessage', payload);
    setNewMsg('');
  };

  // --- 4) UPLOAD FILE + SEND AS MESSAGE ---
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.[0] || !socket) return;
    const file = e.target.files[0];
    const form = new FormData();
    form.append('file', file);

    // upload to backend
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: form,
    });
    const body = await res.json();

    socket.emit('chatMessage', {
      user: { id: user!.id, fullName: user!.fullName, avatar: '' },
      fileUrl: body.url,
      timestamp: Date.now(),
    });
    // reset input
    e.target.value = '';
  };

  // --- 5) UTILITY: format timestamps ---
  const fmtTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // --- 6) INITIATE CALL (VOICE/VIDEO) ---
  const startCall = async (video: boolean) => {
    if (!socket || !selectedConvo) return;
    const pc = new RTCPeerConnection();

    // getUserMedia
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: video,
    });
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    // send our tracks to the remote peer...
    // TODO: render local stream to a <video> element

    // create offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit('call-user', {
      to: selectedConvo.user.id,
      offer,
    });

    // handle ICE
    pc.onicecandidate = (ev) => {
      if (ev.candidate) {
        socket.emit('ice-candidate', {
          to: selectedConvo.user.id,
          candidate: ev.candidate,
        });
      }
    };

    // handle remote stream
    pc.ontrack = (ev) => {
      // TODO: attach ev.streams[0] to remote <video> element
    };
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Messages</h2>
          <Edit size={20} />
        </div>
        <div className="p-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-100"
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {filtered.map((convo) => (
            <div
              key={convo.id}
              className={`p-3 cursor-pointer flex items-center ${
                selectedConvo?.id === convo.id
                  ? 'bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedConvo(convo)}
            >
              <img
                src={convo.user.avatar}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">
                    {convo.user.fullName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {fmtTime(convo.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {convo.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Panel */}
      {selectedConvo ? (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-3 flex items-center justify-between border-b">
            <div className="flex items-center">
              <img
                src={selectedConvo.user.avatar}
                className="w-8 h-8 rounded-full mr-3"
              />
              <div>
                <h3 className="font-medium">
                  {selectedConvo.user.fullName}
                </h3>
                <p className="text-xs text-gray-500">Active now</p>
              </div>
            </div>
            <div className="space-x-4">
              <button onClick={() => startCall(false)}>
                <Phone />
              </button>
              <button onClick={() => startCall(true)}>
                <Video />
              </button>
              <Info />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-auto space-y-4">
            {messages.map((m, i) => {
              const mine = m.user.id === user!.id;
              return (
                <div
                  key={i}
                  className={`flex ${
                    mine ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!mine && (
                    <img
                      src={m.user.avatar}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <div
                    className={`max-w-[60%] p-3 rounded-lg ${
                      mine
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {m.text && <p>{m.text}</p>}
                    {m.fileUrl && (
                      <div className="mt-2">
                        {/* show image/video by extension */}
                        {m.fileUrl.match(/\.(mp4|webm)$/) ? (
                          <video
                            src={m.fileUrl}
                            controls
                            className="max-w-full rounded"
                          />
                        ) : (
                          <img
                            src={m.fileUrl}
                            className="max-w-full rounded"
                          />
                        )}
                      </div>
                    )}
                    <div className="text-xs mt-1 opacity-50">
                      {fmtTime(m.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex items-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500"
            >
              <Image />
            </button>
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <form className="flex-1 ml-3 flex" onSubmit={sendText}>
              <input
                className="flex-1 rounded-full px-4 py-2 bg-gray-100"
                placeholder="Type a message…"
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
              />
              <button
                type="submit"
                className="ml-2 p-2 text-blue-600"
                disabled={!newMsg.trim()}
              >
                <Send />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p>Select a conversation to start</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;

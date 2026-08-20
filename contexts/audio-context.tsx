"use client"

import { createContext, useContext, useRef, useCallback, ReactNode } from "react"

type VideoPlayerLike = {
  pauseVideo?: () => void
  mute?: () => void
  getPlayerState?: () => number
}

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>
  pauseMusic: () => void
  resumeMusic: () => void
  isVideoPlaying: () => boolean
  isVideoActive: (id: string) => boolean
  registerVideoPlayer: (id: string, player: VideoPlayerLike) => void
  unregisterVideoPlayer: (id: string) => void
  onVideoPlay: (id: string) => void
  onVideoPauseOrEnd: (id: string) => void
}

const AudioContext = createContext<AudioContextType | null>(null)

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const playersRef = useRef<Map<string, VideoPlayerLike>>(new Map())
  const playingIdsRef = useRef<Set<string>>(new Set())

  const pauseMusic = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause()
    }
  }, [])

  const resumeMusic = useCallback(() => {
    if (playingIdsRef.current.size > 0) return
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch((error) => {
        console.log("Resume playback blocked:", error)
      })
    }
  }, [])

  const isVideoPlaying = useCallback(() => playingIdsRef.current.size > 0, [])

  const isVideoActive = useCallback((id: string) => playingIdsRef.current.has(id), [])

  const registerVideoPlayer = useCallback((id: string, player: VideoPlayerLike) => {
    playersRef.current.set(id, player)
  }, [])

  const unregisterVideoPlayer = useCallback((id: string) => {
    playersRef.current.delete(id)
    playingIdsRef.current.delete(id)
    if (playingIdsRef.current.size === 0) {
      resumeMusic()
    }
  }, [resumeMusic])

  const onVideoPlay = useCallback((id: string) => {
    playingIdsRef.current.add(id)
    pauseMusic()

    playersRef.current.forEach((player, playerId) => {
      if (playerId === id) return
      try {
        player.mute?.()
        player.pauseVideo?.()
      } catch {
        // Ignore players that are not ready
      }
      playingIdsRef.current.delete(playerId)
    })
  }, [pauseMusic])

  const onVideoPauseOrEnd = useCallback((id: string) => {
    playingIdsRef.current.delete(id)
    if (playingIdsRef.current.size === 0) {
      resumeMusic()
    }
  }, [resumeMusic])

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        pauseMusic,
        resumeMusic,
        isVideoPlaying,
        isVideoActive,
        registerVideoPlayer,
        unregisterVideoPlayer,
        onVideoPlay,
        onVideoPauseOrEnd,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}

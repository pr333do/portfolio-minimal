// @ts-nocheck
'use client'

import { useIsMobile } from '@/hooks/useIsMobile'
import { PlusIcon } from '@radix-ui/react-icons'
import cs from 'classnames'
import GSAP from 'gsap'
import { useCallback, useEffect, useRef, useState } from 'react'

const Cursor = () => {
  const isMobile = useIsMobile()

  const cursor = useRef<HTMLDivElement>(null)
  const coords = useRef({
    currX: 0,
    currY: 0,
    prevX: 0,
    prevY: 0,
  })
  // const [hasMoved, setHasMoved] = useState(false)
  const [isPointer, setIsPointer] = useState(false)

  const onMouseMove = useCallback(({ clientX, clientY }: MouseEvent) => {
    coords.current.currX = clientX
    coords.current.currY = clientY
  }, [])

  const onTouchMove = useCallback((event: TouchEvent) => {
    const target = event.targetTouches[0]

    coords.current.currX = target.clientX
    coords.current.currY = target.clientY
  }, [])

  const update = useCallback(() => {
    const { currX, currY, prevX, prevY } = coords.current

    const progress = isMobile ? 0.075 : 0.1

    const targetX = GSAP.utils.interpolate(prevX, currX, progress)
    const targetY = GSAP.utils.interpolate(prevY, currY, progress)

    GSAP.to(cursor.current, {
      x: targetX,
      y: targetY,
      duration: 0.2,
      ease: 'expo.out',
    })

    coords.current.prevX = targetX
    coords.current.prevY = targetY

    requestAnimationFrame(update)
  }, [isMobile])

  useEffect(() => {
    const requestAnimationFrameId = requestAnimationFrame(update)

    if (isMobile) {
      window.addEventListener('touchmove', onTouchMove, false)
    } else {
      window.addEventListener('mousemove', onMouseMove, false)
    }

    return () => {
      cancelAnimationFrame(requestAnimationFrameId)

      if (isMobile) {
        window.removeEventListener('touchmove', onTouchMove, false)
      } else {
        window.removeEventListener('mousemove', onMouseMove, false)
      }
    }
  }, [onMouseMove, onTouchMove, isMobile, update])

  /**
   * Effects to add events to control hover behavior
   * for specific elements
   */
  useEffect(() => {
    const onMouseEnter = () => {
      setIsPointer(true)
    }
    const onMouseLeave = () => {
      setIsPointer(false)
    }

    const elements = [...document.querySelectorAll('a'), ...document.querySelectorAll('button')]

    elements.forEach(element => {
      element.addEventListener('mouseenter', onMouseEnter, false)
      element.addEventListener('mouseleave', onMouseLeave, false)
    })

    return () => {
      elements.forEach(element => {
        element.removeEventListener('mouseenter', onMouseEnter, false)
        element.removeEventListener('mouseleave', onMouseLeave, false)
      })
    }
  }, [])

  /**
   * Mobile setup
   */
  useEffect(() => {
    if (isMobile) {
      coords.current = {
        currX: innerWidth / 2,
        currY: innerHeight / 2,
        prevX: innerWidth / 2,
        prevY: innerHeight / 2,
      }
      setIsPointer(true)
    }
  }, [isMobile])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <div ref={cursor} className="">
        <div className={cs("absolute -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center after:content-normal after:absolute after:bg-white after:blur-3xl after:w-12 after:h-12 after:mix-blend-difference")}>
          <PlusIcon className={cs('w-8 h-8 text-zinc-100',  isPointer && "animate-spin")}/>
        </div>
      </div>
    </div>
  )
}

export { Cursor }

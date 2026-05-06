import { useEffect, useRef } from "react"
import leafUrl from "../../icons/leaf.png"

// 나뭇잎 낙하 속도 설정
const Y_SPEED = 0.45
const Y_SPEED_VARIANCE = 0.6

// 좌우로 흔들리는 폭
const SWAY_AMPLITUDE = 18
const SWAY_AMPLITUDE_VARIANCE = 28

// 좌우 흔들림 속도
const SWAY_SPEED = 0.008
const SWAY_SPEED_VARIANCE = 0.014

// 회전 속도
const ROTATE_SPEED_VARIANCE = 0.025

/**
 * 개별 나뭇잎 객체를 관리하는 클래스입니다.
 */
class Leaf {
  x: number = 0
  y: number = 0
  baseX: number = 0
  w: number = 0
  h: number = 0
  opacity: number = 0
  ySpeed: number = 0
  swayAmplitude: number = 0
  swaySpeed: number = 0
  swayOffset: number = 0
  rotate: number = 0
  rotateSpeed: number = 0

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
    private leafImg: HTMLImageElement,
  ) {
    this.reset(false)
  }

  /**
   * 나뭇잎의 크기, 투명도, 속도 등을 무작위로 초기화합니다.
   */
  reset(fromTop = true) {
    this.w = 22 + Math.random() * 22
    this.h = 18 + Math.random() * 18
    this.opacity = 0.35 + Math.random() * 0.35

    this.baseX = Math.random() * this.canvas.width
    this.x = this.baseX

    this.y = fromTop
      ? -this.h - Math.random() * this.canvas.height * 0.3
      : Math.random() * this.canvas.height

    this.ySpeed = Y_SPEED + Math.random() * Y_SPEED_VARIANCE

    this.swayAmplitude =
      SWAY_AMPLITUDE + Math.random() * SWAY_AMPLITUDE_VARIANCE
    this.swaySpeed = SWAY_SPEED + Math.random() * SWAY_SPEED_VARIANCE
    this.swayOffset = Math.random() * Math.PI * 2

    this.rotate = Math.random() * Math.PI * 2
    this.rotateSpeed =
      (Math.random() - 0.5) * ROTATE_SPEED_VARIANCE
  }

  /**
   * 화면에 나뭇잎을 그립니다.
   */
  draw() {
    this.ctx.save()

    this.ctx.globalAlpha = this.opacity

    this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2)
    this.ctx.rotate(this.rotate)

    this.ctx.drawImage(
      this.leafImg,
      -this.w / 2,
      -this.h / 2,
      this.w,
      this.h,
    )

    this.ctx.restore()
  }

  /**
   * 나뭇잎의 위치를 업데이트하고 다시 그립니다.
   */
  animate() {
    this.y += this.ySpeed
    this.rotate += this.rotateSpeed
    this.swayOffset += this.swaySpeed

    this.x = this.baseX + Math.sin(this.swayOffset) * this.swayAmplitude

    if (
      this.y > this.canvas.height + this.h ||
      this.x < -80 ||
      this.x > this.canvas.width + 80
    ) {
      this.reset(true)
    }

    this.draw()
  }
}

/**
 * 배경에 나뭇잎이 흩날리는 애니메이션 효과를 주는 컴포넌트입니다.
 */
export const BGEffect = () => {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const leavesRef = useRef<Leaf[]>([])
  const resizeTimeoutRef = useRef<number | null>(null)
  const animationFrameIdRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = ref.current

    if (!canvas) {
      return
    }

    const ctx = canvas.getContext("2d")

    if (!ctx) {
      return
    }

    const leafImg = new Image()
    leafImg.src = leafUrl

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1

      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr

      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    /**
     * 화면 크기에 따른 적절한 나뭇잎 개수를 계산합니다.
     */
    const getLeafNum = () => {
      return Math.floor((window.innerWidth * window.innerHeight) / 42000)
    }

    /**
     * 나뭇잎들을 생성하고 초기화합니다.
     */
    const initializeLeaves = () => {
      const count = getLeafNum()
      const leaves: Leaf[] = []

      for (let i = 0; i < count; i++) {
        leaves.push(new Leaf(canvas, ctx, leafImg))
      }

      leavesRef.current = leaves
    }

    /**
     * 매 프레임마다 나뭇잎을 렌더링합니다.
     */
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      leavesRef.current.forEach((leaf) => leaf.animate())

      animationFrameIdRef.current = requestAnimationFrame(render)
    }

    /**
     * 화면 크기 변경 시 캔버스 크기를 조정하고 나뭇잎 개수를 조절합니다.
     */
    const onResize = () => {
      if (resizeTimeoutRef.current !== null) {
        clearTimeout(resizeTimeoutRef.current)
      }

      resizeTimeoutRef.current = window.setTimeout(() => {
        resizeCanvas()

        const newLeafNum = getLeafNum()

        if (newLeafNum > leavesRef.current.length) {
          for (let i = leavesRef.current.length; i < newLeafNum; i++) {
            leavesRef.current.push(new Leaf(canvas, ctx, leafImg))
          }
        } else if (newLeafNum < leavesRef.current.length) {
          leavesRef.current.splice(newLeafNum)
        }
      }, 100)
    }

    resizeCanvas()

    leafImg.onload = () => {
      initializeLeaves()
      render()
    }

    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)

      if (resizeTimeoutRef.current !== null) {
        clearTimeout(resizeTimeoutRef.current)
      }

      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
    }
  }, [])

  return (
    <div className="bg-effect">
      <canvas ref={ref} />
    </div>
  )
}
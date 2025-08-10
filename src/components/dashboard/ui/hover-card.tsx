import React, { ReactNode, useRef, useCallback, useMemo, memo } from 'react';
import { cn } from '@/lib/utils';

const TRANSITION = 'transform 0.2s cubic-bezier(.03,.98,.52,.99)';
const WILL_CHANGE = 'transform';
const DISPLAY = 'inline-block';

const HoverCard = (props: { children: ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const style = useMemo(
    () => ({
      transition: TRANSITION,
      willChange: WILL_CHANGE,
      display: DISPLAY,
    }),
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 15;
      const rotateY = ((x - centerX) / centerX) * -15;

      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.transform =
        'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  }, []);

  return (
    <div
      ref={cardRef}
      style={style}
      className={cn(props.className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {props.children}
    </div>
  );
};

export default memo(HoverCard);

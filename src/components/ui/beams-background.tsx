// Add visibility check
useEffect(() => {
  let isVisible = true;
  
  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  });
  
  if (canvasRef.current) observer.observe(canvasRef.current);
  
  function animate() {
    if (!isVisible) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }
    // ... existing animation code
  }
  
  return () => observer.disconnect();
}, []);

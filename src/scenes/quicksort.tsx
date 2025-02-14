import { Layout, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import { createRef, all, easeInOutCubic, slideTransition, Direction, waitFor } from "@motion-canvas/core";

export default makeScene2D(function *(view){
  const values = [20, 50, 30, 70, 80, 40, 10, 60];
  const bars = values.map(() => (createRef<Rect>()));
  const iter = createRef<Txt>();
  const fadeOut = createRef<Rect>();
  let it = 0;

  // Add rectangles in the view
  view.add(
    bars.map((bar, i)=>(
      <Layout>
      <Txt
        scale={3}
        fill={'white'}
        y={-330}
        x={0}
        fontFamily={'Raleway'}
        text={'Quicksort'}
      />
      <Rect
        ref={bar}
        width={30}
        height={values[i]*5}
        fill={'lightblue'}
        x={-175+(i*50)}
        y={0}
      />
      <Txt
        ref={iter}
        scale={3}
        fill={'white'}
        y={330}
        x={0}
        fontFamily={'Raleway'}
      />
      <Rect
        ref={fadeOut}
        width={1920}
        height={1080}
        fill={'black'}
        opacity={0}
      />
      </Layout>
    ))
  );

  iter().text(`Iterations: ${it}`);
  yield* slideTransition(Direction.Left, 1);

  yield* waitFor(0.8);
  yield* quicksort(0, values.length-1);

  for(let i = 0; i < bars.length; i++) {
    yield* bars[i]().fill('lightgreen', 0.2, easeInOutCubic);
  }

  yield* waitFor(0.8);
  yield* fadeOut().opacity(1, 1.5, easeInOutCubic);


  function* quicksort(start: number, end: number): any {
    if(start>=end) return;
    let pivotIndex = yield* partition(start, end);
    yield* quicksort(start, pivotIndex - 1);
    yield* quicksort(pivotIndex + 1, end);
  }

  function* partition(start: number, end: number) {
    const pivotValue = values[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
      if (values[i] < pivotValue) {
        if (i !== pivotIndex) {
          // Swap values in the array.
          [values[i], values[pivotIndex]] = [values[pivotIndex], values[i]];

          // Store original x-positions.
          const posI = bars[i]().position.x();
          const posPivot = bars[pivotIndex]().position.x();

          it++;
          iter().text(`Iterations: ${it}`);
          // Animate the swap.
          yield* all(
            bars[i]().position.x(posPivot, 0.5, easeInOutCubic),
            bars[pivotIndex]().position.x(posI, 0.5, easeInOutCubic)
          );
          // Swap the bar references.
          [bars[i], bars[pivotIndex]] = [bars[pivotIndex], bars[i]];
        }
        pivotIndex++;
      }
    }

    // Swap pivot into its correct position, if necessary.
    if (pivotIndex !== end) {
      [values[pivotIndex], values[end]] = [values[end], values[pivotIndex]];

      const posPivot = bars[pivotIndex]().position.x();
      const posEnd = bars[end]().position.x();

      it++;
      iter().text(`Iterations: ${it}`);
      yield* all(
        bars[pivotIndex]().position.x(posEnd, 0.5, easeInOutCubic),
        bars[end]().position.x(posPivot, 0.5, easeInOutCubic)
      );

      [bars[pivotIndex], bars[end]] = [bars[end], bars[pivotIndex]];
    }

    return pivotIndex;
  }
});
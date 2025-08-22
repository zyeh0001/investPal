import { InvestPalUi , Button as Btn} from "@investPal/ui";
import { Button } from "@investPal/designSystem";

export default function Index() {
  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <Btn  variant='outline'>Button from design system</Btn>
           <Button size='lg' variant= 'outline'>Button from design system</Button>
          <InvestPalUi />
        </div>
      </div>
    </div>
  );
}

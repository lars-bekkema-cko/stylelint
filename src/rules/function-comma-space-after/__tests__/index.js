import {
  ruleTester,
  warningFreeBasics
} from "../../../testUtils"
import rule, { ruleName, messages } from ".."

const testRule = ruleTester(rule, ruleName)

testRule("always", tr => {
  warningFreeBasics(tr)

  tr.ok("a::before { content: \"func(foo,bar,baz)\"; }")
  tr.ok("a::before { background: url('func(foo,bar,baz)'); }")
  tr.ok("a { background-size: 0,0,0; }")
  tr.ok("a { transform: translate(1 , 1); }")
  tr.ok("a { transform: translate(1, 1); }")
  tr.ok("a { transform: color(rgb(0 , 0, 0) lightness(50%)); }")

  tr.notOk("a { transform: translate(1,1); }", messages.expectedAfter())
  tr.notOk("a { transform: translate(1,  1); }", messages.expectedAfter())
  tr.notOk("a { transform: translate(1,\n1); }", messages.expectedAfter())
  tr.notOk("a { transform: translate(1,\r\n1); }", messages.expectedAfter(), "CRLF")
  tr.notOk("a { transform: translate(1,\t1); }", messages.expectedAfter())
  tr.notOk("a { transform: color(rgb(0 , 0 ,0) lightness(50%)); }", messages.expectedAfter())
  tr.notOk("a { transform: color(lightness(50%) rgb(0 , 0 ,0)); }", messages.expectedAfter())
})

testRule("never", tr => {
  warningFreeBasics(tr)

  tr.ok("a::before { content: \"func(foo, bar, baz)\"; }")
  tr.ok("a::before { background: url('func(foo, bar, baz)'); }")
  tr.ok("a { background-size: 0, 0, 0; }")
  tr.ok("a { transform: translate(1 ,1); }")
  tr.ok("a { transform: translate(1,1); }")
  tr.ok("a { transform: color(rgb(0 ,0,0) lightness(50%)); }")

  tr.notOk("a { transform: translate(1, 1); }", messages.rejectedAfter())
  tr.notOk("a { transform: translate(1,  1); }", messages.rejectedAfter())
  tr.notOk("a { transform: translate(1,\n1); }", messages.rejectedAfter())
  tr.notOk("a { transform: translate(1,\r\n1); }", messages.rejectedAfter(), "CRLF")
  tr.notOk("a { transform: translate(1,\t1); }", messages.rejectedAfter())
  tr.notOk("a { transform: color(rgb(0 , 0 ,0) lightness(50%)); }", messages.rejectedAfter())
  tr.notOk("a { transform: lightness(50%) color(rgb(0 , 0 ,0) ); }", messages.rejectedAfter())
})

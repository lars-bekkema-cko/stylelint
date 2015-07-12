import {
  cssStatementBlockString,
  cssStatementHasBlock,
  cssStatementHasEmptyBlock,
  report,
  ruleMessages,
  cssStatementStringBeforeBlock,
  whitespaceChecker
} from "../../utils"

export const ruleName = "block-opening-brace-space-before"

export const messages = ruleMessages(ruleName, {
  expectedBefore: () => `Expected single space before "{"`,
  rejectedBefore: () => `Unexpected whitespace before "{"`,
  expectedBeforeSingleLine: () => `Expected single space before "{" of a single-line block`,
  rejectedBeforeSingleLine: () => `Unexpected whitespace before "{" of a single-line block`,
  expectedBeforeMultiLine: () => `Expected single space before "{" of a multi-line block`,
  rejectedBeforeMultiLine: () => `Unexpected whitespace before "{" of a multi-line block`,
})

/**
 * @param {"always"|"never"|"always-single-line"|"never-single-line"|"always-multi-line"|"never-multi-line"} expectation
 */
export default function (expectation) {
  const checker = whitespaceChecker("space", expectation, messages)
  return (root, result) => {

    // Check both kinds of statements: rules and at-rules
    root.eachRule(check)
    root.eachAtRule(check)

    function check(statement) {
      // Return early if blockless or has empty block
      if (!cssStatementHasBlock(statement) || cssStatementHasEmptyBlock(statement)) { return }

      const source = cssStatementStringBeforeBlock(statement)

      checker.before({
        source,
        index: source.length,
        lineCheckStr: cssStatementBlockString(statement),
        err: m => {
          report({
            message: m,
            node: statement,
            result,
            ruleName,
          })
        },
      })
    }
  }
}

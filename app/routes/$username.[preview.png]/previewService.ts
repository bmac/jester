import { escape } from "html-escaper";
import { Resvg } from "@resvg/resvg-js";
import { Gist } from "~/clients/githubClient";

const resvgConfig = {
  fitTo: {
    mode: "width" as const,
    value: 600,
  },
  font: {
    fontFiles: [
      "./public/fonts/LuckiestGuy-Regular.ttf",
      "./public/fonts/georgia.ttf",
    ], // Load custom fonts.
    loadSystemFonts: true, // It will be faster to disable loading system fonts.
    defaultFontFamily: "Georgia",
  },
};

export const createPreviewImage = (username: string, gist: Gist) => {
  const filename = gist.files[0]?.name || "";

  const svg = createPreviewSvg({
    username,
    filename,
    description: gist.description,
    stars: gist.stargazerCount,
  });
  const image = new Resvg(svg, resvgConfig).render();

  return image.asPng();
};

const createPreviewSvg = ({
  username,
  filename,
  stars,
  description,
}: {
  username: string;
  filename: string;
  description: string;
  stars: number;
}) => {
  return `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" data-stacking-context="true" aria-owns="html1" width="375" height="540" viewBox="0 0 375 540">
    <style/>
    <g data-stacking-layer="rootBackgroundAndBorders"/>
    <g data-stacking-layer="childStackingContextsWithNegativeStackLevels"/>
    <g data-stacking-layer="inFlowNonInlineNonPositionedDescendants"/>
    <g data-stacking-layer="nonPositionedFloats"/>
    <g data-stacking-layer="inFlowInlineLevelNonPositionedDescendants"/>
    <g data-stacking-layer="childStackingContextsWithStackLevelZeroAndPositionedDescendantsWithStackLevelZero"/>
    <g data-stacking-layer="childStackingContextsWithPositiveStackLevels"/>
    <g data-tag="html" id="html1" data-z-index="auto" data-stacking-context="true" aria-owns="head1 body1">
        <g data-tag="head" id="head1" data-z-index="auto" data-stacking-context="true" aria-owns="meta1 meta2 link1 link2 link3 link4 title1 meta3 meta4 meta5 meta6 meta7 meta8 meta9 meta10 meta11 meta12 meta13 style1 style2 style3 style4">
            <g data-tag="meta" id="meta1" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="meta" id="meta2" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="link" id="link1" data-z-index="auto" data-stacking-context="true" role="link"/>
            <g data-tag="link" id="link2" data-z-index="auto" data-stacking-context="true" role="link"/>
            <g data-tag="link" id="link3" data-z-index="auto" data-stacking-context="true" role="link"/>
            <g data-tag="link" id="link4" data-z-index="auto" data-stacking-context="true" role="link"/>
            <g data-tag="title" id="title1" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="meta" id="meta3" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="meta" id="meta4" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="meta" id="meta5" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="meta" id="meta6" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="meta" id="meta7" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="meta" id="meta8" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="meta" id="meta9" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="meta" id="meta10" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="meta" id="meta11" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="meta" id="meta12" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="meta" id="meta13" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="style" id="style1" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="style" id="style2" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="style" id="style3" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="style" id="style4" data-z-index="auto" data-stacking-context="true"/>
        </g>
        <g data-tag="body" id="body1" data-z-index="auto" data-stacking-context="true" role="document" aria-owns="header1 _content_1fotg_531 _background_1fotg_611 script1 link5 link6 link7 link8 script2 script3">
            <g data-stacking-layer="childStackingContextsWithNegativeStackLevels">
                <g data-tag="div" id="_background_1fotg_611" class="_background_1fotg_61" data-z-index="-1" data-stacking-context="true">
                    <g data-stacking-layer="rootBackgroundAndBorders">
                        <linearGradient x1="15%" y1="85%" x2="85%" y2="15%" id="linear-gradient3">
                            <stop offset="0%" stop-color="rgb(139,0,0)" stop-opacity="1"/>
                            <stop offset="16.666666666666664%" stop-color="rgb(165,42,42)" stop-opacity="1"/>
                            <stop offset="33.33333333333333%" stop-color="rgb(165,42,42)" stop-opacity="1"/>
                            <stop offset="50%" stop-color="rgb(139,0,0)" stop-opacity="1"/>
                            <stop offset="66.66666666666666%" stop-color="rgb(139,0,0)" stop-opacity="1"/>
                            <stop offset="83.33333333333334%" stop-color="rgb(165,42,42)" stop-opacity="1"/>
                            <stop offset="100%" stop-color="rgb(165,42,42)" stop-opacity="1"/>
                        </linearGradient>
                        <rect width="475" height="1400" x="-50" y="-550" fill="url(#linear-gradient3)"/>
                    </g>
                </g>
            </g>
            <g data-stacking-layer="childStackingContextsWithPositiveStackLevels">
                <g data-tag="header" id="header1" data-z-index="99" data-stacking-context="true" role="banner" aria-owns="_logoLink_1fotg_881 _subHeading_1fotg_831">
                    <g data-stacking-layer="rootBackgroundAndBorders">
                        <linearGradient x1="0%" y1="100%" x2="0%" y2="0%" id="linear-gradient1">
                            <stop offset="0%" stop-color="rgb(128,0,0)" stop-opacity="1"/>
                            <stop offset="100%" stop-color="rgb(64,33,41)" stop-opacity="1"/>
                        </linearGradient>
                        <rect width="375" height="60" x="0" y="0" fill="url(#linear-gradient1)"/>
                        <line stroke-linecap="square" stroke="rgb(255, 215, 0)" stroke-width="1px" x1="0" x2="375" y1="60" y2="60"/>
                    </g>
                    <a href="/" data-tag="a" id="_logoLink_1fotg_881" class="_logoLink_1fotg_88" data-z-index="auto" data-stacking-context="true" role="link" aria-owns="_logo_1fotg_881">
                        <g data-tag="span" id="_logo_1fotg_881" class="_logo_1fotg_88" data-z-index="auto" data-stacking-context="true">
                            <text color="rgb(250, 250, 210)" dominant-baseline="text-after-edge" font-family="&quot;Luckiest Guy&quot;, cursive" font-size="32px" font-stretch="100%" font-style="normal" font-variant="normal" font-weight="400" direction="ltr" letter-spacing="normal" text-decoration="none solid rgb(250, 250, 210)" text-anchor="start" text-rendering="auto" unicode-bidi="normal" word-spacing="0px" writing-mode="horizontal-tb" user-select="auto" fill="rgb(250, 250, 210)">
                                <tspan xml:space="preserve" x="16" y="55.5" textLength="25" lengthAdjust="spacingAndGlyphs">♠️</tspan>
                            </text>
                        </g>
                        <text color="rgb(250, 250, 210)" dominant-baseline="text-after-edge" font-family="&quot;Luckiest Guy&quot;, cursive" font-size="32px" font-stretch="100%" font-style="normal" font-variant="normal" font-weight="400" direction="ltr" letter-spacing="normal" text-decoration="none solid rgb(250, 250, 210)" text-anchor="start" text-rendering="auto" unicode-bidi="normal" word-spacing="0px" writing-mode="horizontal-tb" user-select="auto" fill="rgb(250, 250, 210)">
                            <tspan xml:space="preserve" x="58" y="55.5" textLength="77.90625" lengthAdjust="spacingAndGlyphs"> Jester</tspan>
                        </text>
                    </a>
                    <g data-tag="span" id="_subHeading_1fotg_831" class="_subHeading_1fotg_83" data-z-index="auto" data-stacking-context="true">
                        <text color="rgb(255, 255, 255)" dominant-baseline="text-after-edge" font-family="Times" font-size="25.6px" font-stretch="100%" font-style="normal" font-variant="normal" font-weight="400" direction="ltr" letter-spacing="normal" text-decoration="none solid rgb(255, 255, 255)" text-anchor="start" text-rendering="auto" unicode-bidi="normal" word-spacing="0px" writing-mode="horizontal-tb" user-select="auto" fill="rgb(255, 255, 255)">
                            <tspan xml:space="preserve" x="170.59375" y="47" textLength="188.40625" lengthAdjust="spacingAndGlyphs">gist stars for ${escape(username)}</tspan>
                        </text>
                    </g>
                </g>
            </g>
            <g data-tag="div" id="_content_1fotg_531" class="_content_1fotg_53" data-z-index="auto" data-stacking-context="true" aria-owns="_cards_1i76z_11">
                <g data-tag="div" id="_cards_1i76z_11" class="_cards_1i76z_1" data-z-index="auto" data-stacking-context="true" aria-owns="_card_i8bpk_11">
                    <g data-tag="div" id="_card_i8bpk_11" class="_card_i8bpk_1  _diamonds_i8bpk_74  " data-z-index="auto" data-stacking-context="true" aria-owns="_corner_i8bpk_181 _content_i8bpk_471 _corner_i8bpk_182">
                        <g data-stacking-layer="rootBackgroundAndBorders">
                            <linearGradient x1="0%" y1="0%" x2="0%" y2="0%" id="linear-gradient2">
                                <stop offset="0%" stop-color="rgb(242,242,230)" stop-opacity="1"/>
                                <stop offset="100%" stop-color="rgb(245,245,220)" stop-opacity="1"/>
                            </linearGradient>
                            <rect width="315" height="400" x="30" y="110" fill="url(#linear-gradient2)" stroke="rgb(204, 204, 204)" stroke-width="1px" rx="10" ry="10"/>
                        </g>
                        <g data-tag="div" id="_corner_i8bpk_181" class="_corner_i8bpk_18 _cornerTopLeft_i8bpk_18" data-z-index="auto" data-stacking-context="true">
                            <text color="rgb(165, 42, 42)" dominant-baseline="text-after-edge" font-family="cursive, sans-serif" font-size="24px" font-stretch="100%" font-style="normal" font-variant="normal" font-weight="700" direction="ltr" letter-spacing="-6px" text-decoration="none solid rgb(165, 42, 42)" text-anchor="start" text-rendering="auto" unicode-bidi="isolate" word-spacing="0px" user-select="auto" fill="rgb(165, 42, 42)">
                                <tspan xmlns="http://www.w3.org/2000/svg" xml:space="preserve" x="35" y="155" textLength="13" lengthAdjust="spacingAndGlyphs" transform="rotate(90)">A</tspan>
                                <tspan xmlns="http://www.w3.org/2000/svg" xml:space="preserve" x="36" y="187" textLength="13" lengthAdjust="spacingAndGlyphs" font-size="32px">♦</tspan>
                            </text>
                        </g>
                        <g data-tag="article" id="_content_i8bpk_471" class="_content_i8bpk_47" data-z-index="auto" data-stacking-context="true" role="article" aria-owns="_header_1i76z_131 _description_1i76z_361 _code_1i76z_271">
                            <g data-stacking-layer="rootBackgroundAndBorders">
                                <rect width="253" height="338" x="61" y="141" fill="rgba(0, 0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-width="1px" rx="10" ry="10"/>
                            </g>
                            <g data-tag="section" id="_header_1i76z_131" class="_header_1i76z_13" data-z-index="auto" data-stacking-context="true" role="region" aria-owns="_filename_1i76z_201 _stars_1i76z_321">
                                <a href="https://jester.codes/" data-tag="a" id="_filename_1i76z_201" class="_filename_1i76z_20" data-z-index="auto" data-stacking-context="true" role="link" mask="url(#mask-for-_filename_1i76z_2011)">
                                    <mask id="mask-for-_filename_1i76z_2011">
                                        <rect width="101.75" height="19.5" x="77" y="159.25" fill="#ffffff"/>
                                    </mask>
                                    <text color="rgb(128, 0, 0)" dominant-baseline="text-after-edge" font-family="monospace" font-size="18px" font-stretch="100%" font-style="normal" font-variant="normal" font-weight="400" direction="ltr" letter-spacing="normal" text-decoration="underline solid rgb(128, 0, 0)" text-anchor="start" text-rendering="auto" unicode-bidi="normal" word-spacing="0px" writing-mode="horizontal-tb" user-select="auto" fill="rgb(128, 0, 0)">
                                        <tspan xml:space="preserve" x="77" y="176.25" textLength="101.75" lengthAdjust="spacingAndGlyphs">${escape(filename)}</tspan>
                                    </text>
                                </a>
                                <g data-tag="span" id="_stars_1i76z_321" class="_stars_1i76z_32" data-z-index="auto" data-stacking-context="true">
                                    <text color="rgb(218, 165, 32)" dominant-baseline="text-after-edge" font-family="Georgia, serif" font-size="16px" font-stretch="100%" font-style="normal" font-variant="normal" font-weight="400" direction="ltr" letter-spacing="normal" text-decoration="none solid rgb(218, 165, 32)" text-anchor="start" text-rendering="auto" unicode-bidi="normal" word-spacing="0px" writing-mode="horizontal-tb" user-select="auto" fill="rgb(218, 165, 32)">
                                        <tspan xml:space="preserve" x="231.484375" y="178" textLength="19.859375" lengthAdjust="spacingAndGlyphs">★ </tspan>
                                    </text>
                                    <text color="rgb(218, 165, 32)" dominant-baseline="text-after-edge" font-family="Georgia, serif" font-size="16px" font-stretch="100%" font-style="normal" font-variant="normal" font-weight="400" direction="ltr" letter-spacing="normal" text-decoration="none solid rgb(218, 165, 32)" text-anchor="start" text-rendering="auto" unicode-bidi="normal" word-spacing="0px" writing-mode="horizontal-tb" user-select="auto" fill="rgb(218, 165, 32)">
                                        <tspan xml:space="preserve" x="251.34375" y="178" textLength="8.828125" lengthAdjust="spacingAndGlyphs">${escape(String(stars))}</tspan>
                                    </text>
                                    <text color="rgb(218, 165, 32)" dominant-baseline="text-after-edge" font-family="Georgia, serif" font-size="16px" font-stretch="100%" font-style="normal" font-variant="normal" font-weight="400" direction="ltr" letter-spacing="normal" text-decoration="none solid rgb(218, 165, 32)" text-anchor="start" text-rendering="auto" unicode-bidi="normal" word-spacing="0px" writing-mode="horizontal-tb" user-select="auto" fill="rgb(218, 165, 32)">
                                        <tspan xml:space="preserve" x="260.171875" y="178" textLength="37.828125" lengthAdjust="spacingAndGlyphs"> stars</tspan>
                                    </text>
                                </g>
                            </g>
                            <g data-tag="p" id="_description_1i76z_361" class="_description_1i76z_36" data-z-index="auto" data-stacking-context="true" mask="url(#mask-for-_description_1i76z_3611)">
                                <mask id="mask-for-_description_1i76z_3611">
                                    <rect width="221" height="24" x="77" y="181" fill="#ffffff"/>
                                </mask>
                                <text color="rgb(105, 105, 105)" dominant-baseline="text-after-edge" font-family="Georgia, serif" font-size="16px" font-stretch="100%" font-style="normal" font-variant="normal" font-weight="400" direction="ltr" letter-spacing="normal" text-decoration="none solid rgb(105, 105, 105)" text-anchor="start" text-rendering="auto" unicode-bidi="isolate" word-spacing="0px" writing-mode="horizontal-tb" user-select="auto" fill="rgb(105, 105, 105)">
                                    <tspan xml:space="preserve" x="77" y="202" textLength="206.8828125" lengthAdjust="spacingAndGlyphs">${escape(description)}</tspan>
                                </text>
                            </g>
                            <g data-tag="pre" id="_code_1i76z_271" class="_code_1i76z_27" data-z-index="auto" data-stacking-context="true" mask="url(#mask-for-_code_1i76z_2711)">
                                <mask id="mask-for-_code_1i76z_2711">
                                    <rect width="221" height="35.5" x="77" y="205" fill="#ffffff"/>
                                </mask>
                                <text color="rgb(0, 0, 0)" dominant-baseline="text-after-edge" font-family="monospace" font-size="13px" font-stretch="100%" font-style="normal" font-variant="normal" font-weight="400" direction="ltr" letter-spacing="normal" text-decoration="none solid rgb(0, 0, 0)" text-anchor="start" text-rendering="auto" unicode-bidi="isolate" word-spacing="0px" writing-mode="horizontal-tb" user-select="auto" fill="rgb(0, 0, 0)">
                                    <tspan xml:space="preserve" x="77" y="238" textLength="23.484375" lengthAdjust="spacingAndGlyphs">...</tspan>
                                </text>
                            </g>
                        </g>
                        <g data-tag="div" id="_corner_i8bpk_182" class="_corner_i8bpk_18 _cornerBottomRight_i8bpk_32" data-z-index="auto" data-stacking-context="true">
                            <text color="rgb(165, 42, 42)" dominant-baseline="text-after-edge" font-family="cursive, sans-serif" font-size="24px" font-stretch="100%" font-style="normal" font-variant="normal" font-weight="700" direction="ltr" letter-spacing="-6px" text-decoration="none solid rgb(165, 42, 42)" text-anchor="start" text-rendering="auto" unicode-bidi="isolate" word-spacing="0px" writing-mode="vertical-rl" user-select="auto" fill="rgb(165, 42, 42)">
                                <tspan xml:space="preserve" x="310" y="504" textLength="38" lengthAdjust="spacingAndGlyphs"><!--A♦ --></tspan>
                            </text>
                        </g>
                    </g>
                </g>
            </g>
            <g data-tag="script" id="script1" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="link" id="link5" data-z-index="auto" data-stacking-context="true" role="link"/>
            <g data-tag="link" id="link6" data-z-index="auto" data-stacking-context="true" role="link"/>
            <g data-tag="link" id="link7" data-z-index="auto" data-stacking-context="true" role="link"/>
            <g data-tag="link" id="link8" data-z-index="auto" data-stacking-context="true" role="link"/>
            <g data-tag="script" id="script2" data-z-index="auto" data-stacking-context="true"/>
            <g data-tag="script" id="script3" data-z-index="auto" data-stacking-context="true"/>
        </g>
    </g>
</svg>

`;
};

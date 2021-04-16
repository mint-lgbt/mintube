import "video.js"
import "videojs-http-source-selector"
import "videojs-share"
import "videojs-vtt-thumbnails"

!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e(require("video.js"), require("global/window")))
    : "function" == typeof define && define.amd
    ? define(["video.js", "global/window"], e)
    : (t.videojsOverlay = e(t.videojs, t.window));
})(this, function (t, e) {
  "use strict";
  function n(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  }
  (t = t && t.hasOwnProperty("default") ? t.default : t),
    (e = e && e.hasOwnProperty("default") ? e.default : e);
  var r = {
      align: "top-left",
      class: "",
      content: "This overlay will show up while the video is playing",
      debug: !1,
      showBackground: !0,
      attachToControlBar: !1,
      overlays: [{ start: "playing", end: "paused" }],
    },
    i = t.getComponent("Component"),
    o = t.dom || t,
    s = t.registerPlugin || t.plugin,
    a = function (t) {
      return "number" == typeof t && t == t;
    },
    h = function (t) {
      return "string" == typeof t && /^\S+$/.test(t);
    },
    d = (function (r) {
      var i, s;
      function d(t, e) {
        var i;
        return (
          (i = r.call(this, t, e) || this),
          ["start", "end"].forEach(function (t) {
            var e = i.options_[t];
            if (a(e)) i[t + "Event_"] = "timeupdate";
            else if (h(e)) i[t + "Event_"] = e;
            else if ("start" === t)
              throw new Error(
                'invalid "start" option; expected number or string'
              );
          }),
          ["endListener_", "rewindListener_", "startListener_"].forEach(
            function (t) {
              i[t] = function (e) {
                return d.prototype[t].call(n(n(i)), e);
              };
            }
          ),
          "timeupdate" === i.startEvent_ &&
            i.on(t, "timeupdate", i.rewindListener_),
          i.debug(
            'created, listening to "' +
              i.startEvent_ +
              '" for "start" and "' +
              (i.endEvent_ || "nothing") +
              '" for "end"'
          ),
          i.hide(),
          i
        );
      }
      (s = r),
        ((i = d).prototype = Object.create(s.prototype)),
        (i.prototype.constructor = i),
        (i.__proto__ = s);
      var l = d.prototype;
      return (
        (l.createEl = function () {
          var t = this.options_,
            n = t.content,
            r = t.showBackground
              ? "vjs-overlay-background"
              : "vjs-overlay-no-background",
            i = o.createEl("div", {
              className:
                "\n        vjs-overlay\n        vjs-overlay-" +
                t.align +
                "\n        " +
                t.class +
                "\n        " +
                r +
                "\n        vjs-hidden\n      ",
            });
          return (
            "string" == typeof n
              ? (i.innerHTML = n)
              : n instanceof e.DocumentFragment
              ? i.appendChild(n)
              : o.appendContent(i, n),
            i
          );
        }),
        (l.debug = function () {
          if (this.options_.debug) {
            for (
              var e = t.log,
                n = e,
                r = arguments.length,
                i = new Array(r),
                o = 0;
              o < r;
              o++
            )
              i[o] = arguments[o];
            e.hasOwnProperty(i[0]) &&
              "function" == typeof e[i[0]] &&
              (n = e[i.shift()]),
              n.apply(void 0, ["overlay#" + this.id() + ": "].concat(i));
          }
        }),
        (l.hide = function () {
          return (
            r.prototype.hide.call(this),
            this.debug("hidden"),
            this.debug('bound `startListener_` to "' + this.startEvent_ + '"'),
            this.endEvent_ &&
              (this.debug(
                'unbound `endListener_` from "' + this.endEvent_ + '"'
              ),
              this.off(this.player(), this.endEvent_, this.endListener_)),
            this.on(this.player(), this.startEvent_, this.startListener_),
            this
          );
        }),
        (l.shouldHide_ = function (t, e) {
          var n = this.options_.end;
          return a(n) ? t >= n : n === e;
        }),
        (l.show = function () {
          return (
            r.prototype.show.call(this),
            this.off(this.player(), this.startEvent_, this.startListener_),
            this.debug("shown"),
            this.debug(
              'unbound `startListener_` from "' + this.startEvent_ + '"'
            ),
            this.endEvent_ &&
              (this.debug('bound `endListener_` to "' + this.endEvent_ + '"'),
              this.on(this.player(), this.endEvent_, this.endListener_)),
            this
          );
        }),
        (l.shouldShow_ = function (t, e) {
          var n = this.options_.start,
            r = this.options_.end;
          return a(n)
            ? a(r)
              ? t >= n && t < r
              : this.hasShownSinceSeek_
              ? Math.floor(t) === n
              : ((this.hasShownSinceSeek_ = !0), t >= n)
            : n === e;
        }),
        (l.startListener_ = function (t) {
          var e = this.player().currentTime();
          this.shouldShow_(e, t.type) && this.show();
        }),
        (l.endListener_ = function (t) {
          var e = this.player().currentTime();
          this.shouldHide_(e, t.type) && this.hide();
        }),
        (l.rewindListener_ = function (t) {
          var e = this.player().currentTime(),
            n = this.previousTime_,
            r = this.options_.start,
            i = this.options_.end;
          e < n &&
            (this.debug("rewind detected"),
            a(i) && !this.shouldShow_(e)
              ? (this.debug(
                  "hiding; " +
                    i +
                    " is an integer and overlay should not show at this time"
                ),
                (this.hasShownSinceSeek_ = !1),
                this.hide())
              : h(i) &&
                e < r &&
                (this.debug(
                  "hiding; show point (" +
                    r +
                    ") is before now (" +
                    e +
                    ") and end point (" +
                    i +
                    ") is an event"
                ),
                (this.hasShownSinceSeek_ = !1),
                this.hide())),
            (this.previousTime_ = e);
        }),
        d
      );
    })(i);
  t.registerComponent("Overlay", d);
  var l = function (e) {
    var n = this,
      i = t.mergeOptions(r, e);
    Array.isArray(this.overlays_) &&
      this.overlays_.forEach(function (t) {
        n.removeChild(t),
          n.controlBar && n.controlBar.removeChild(t),
          t.dispose();
      });
    var o = i.overlays;
    delete i.overlays,
      (this.overlays_ = o.map(function (e) {
        var r = t.mergeOptions(i, e),
          o =
            "string" == typeof r.attachToControlBar ||
            !0 === r.attachToControlBar;
        if (!n.controls() || !n.controlBar) return n.addChild("overlay", r);
        if (o && -1 !== r.align.indexOf("bottom")) {
          var s = n.controlBar.children()[0];
          if (
            (void 0 !== n.controlBar.getChild(r.attachToControlBar) &&
              (s = n.controlBar.getChild(r.attachToControlBar)),
            s)
          ) {
            var a = n.controlBar.addChild("overlay", r);
            return n.controlBar.el().insertBefore(a.el(), s.el()), a;
          }
        }
        var h = n.addChild("overlay", r);
        return n.el().insertBefore(h.el(), n.controlBar.el()), h;
      }));
  };
  return (l.VERSION = "2.1.4"), s("overlay", l), l;
});
class AnnotationParser {
  static get defaultAppearanceAttributes() {
    return { bgColor: 16777215, bgOpacity: 0.8, fgColor: 0, textSize: 3.15 };
  }
  static get attributeMap() {
    return {
      type: "tp",
      style: "s",
      x: "x",
      y: "y",
      width: "w",
      height: "h",
      sx: "sx",
      sy: "sy",
      timeStart: "ts",
      timeEnd: "te",
      text: "t",
      actionType: "at",
      actionUrl: "au",
      actionUrlTarget: "aut",
      actionSeconds: "as",
      bgOpacity: "bgo",
      bgColor: "bgc",
      fgColor: "fgc",
      textSize: "txsz",
    };
  }
  deserializeAnnotation(serializedAnnotation) {
    const map = this.constructor.attributeMap;
    const attributes = serializedAnnotation.split(",");
    const annotation = {};
    for (const attribute of attributes) {
      const [key, value] = attribute.split("=");
      const mappedKey = this.getKeyByValue(map, key);
      let finalValue = "";
      if (
        [
          "text",
          "actionType",
          "actionUrl",
          "actionUrlTarget",
          "type",
          "style",
        ].indexOf(mappedKey) > -1
      ) {
        finalValue = decodeURIComponent(value);
      } else {
        finalValue = parseFloat(value, 10);
      }
      annotation[mappedKey] = finalValue;
    }
    return annotation;
  }
  serializeAnnotation(annotation) {
    const map = this.constructor.attributeMap;
    let serialized = "";
    for (const key in annotation) {
      const mappedKey = map[key];
      if (
        ["text", "actionType", "actionUrl", "actionUrlTarget"].indexOf(key) >
          -1 &&
        mappedKey &&
        annotation.hasOwnProperty(key)
      ) {
        let text = encodeURIComponent(annotation[key]);
        serialized += `${mappedKey}=${text},`;
      } else if (
        ["text", "actionType", "actionUrl", "actionUrlTarget"].indexOf(
          "key"
        ) === -1 &&
        mappedKey &&
        annotation.hasOwnProperty(key)
      ) {
        serialized += `${mappedKey}=${annotation[key]},`;
      }
    }
    return serialized.substring(0, serialized.length - 1);
  }
  deserializeAnnotationList(serializedAnnotationString) {
    const serializedAnnotations = serializedAnnotationString.split(";");
    serializedAnnotations.length = serializedAnnotations.length - 1;
    const annotations = [];
    for (const annotation of serializedAnnotations) {
      annotations.push(this.deserializeAnnotation(annotation));
    }
    return annotations;
  }
  serializeAnnotationList(annotations) {
    let serialized = "";
    for (const annotation of annotations) {
      serialized += this.serializeAnnotation(annotation) + ";";
    }
    return serialized;
  }
  xmlToDom(xml) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(xml, "application/xml");
    return dom;
  }
  getAnnotationsFromXml(xml) {
    const dom = this.xmlToDom(xml);
    return dom.getElementsByTagName("annotation");
  }
  parseYoutubeAnnotationList(annotationElements) {
    const annotations = [];
    for (const el of annotationElements) {
      const parsedAnnotation = this.parseYoutubeAnnotation(el);
      if (parsedAnnotation) annotations.push(parsedAnnotation);
    }
    return annotations;
  }
  parseYoutubeAnnotation(annotationElement) {
    const base = annotationElement;
    const attributes = this.getAttributesFromBase(base);
    if (!attributes.type || attributes.type === "pause") return null;
    const text = this.getTextFromBase(base);
    const action = this.getActionFromBase(base);
    const backgroundShape = this.getBackgroundShapeFromBase(base);
    if (!backgroundShape) return null;
    const timeStart = backgroundShape.timeRange.start;
    const timeEnd = backgroundShape.timeRange.end;
    if (
      isNaN(timeStart) ||
      isNaN(timeEnd) ||
      timeStart === null ||
      timeEnd === null
    ) {
      return null;
    }
    const appearance = this.getAppearanceFromBase(base);
    let annotation = {
      type: attributes.type,
      x: backgroundShape.x,
      y: backgroundShape.y,
      width: backgroundShape.width,
      height: backgroundShape.height,
      timeStart: timeStart,
      timeEnd: timeEnd,
    };
    if (attributes.style) annotation.style = attributes.style;
    if (text) annotation.text = text;
    if (action) annotation = Object.assign(action, annotation);
    if (appearance) annotation = Object.assign(appearance, annotation);
    if (backgroundShape.hasOwnProperty("sx"))
      annotation.sx = backgroundShape.sx;
    if (backgroundShape.hasOwnProperty("sy"))
      annotation.sy = backgroundShape.sy;
    return annotation;
  }
  getBackgroundShapeFromBase(base) {
    const movingRegion = base.getElementsByTagName("movingRegion")[0];
    if (!movingRegion) return null;
    const regionType = movingRegion.getAttribute("type");
    const regions = movingRegion.getElementsByTagName(`${regionType}Region`);
    const timeRange = this.extractRegionTime(regions);
    const shape = {
      type: regionType,
      x: parseFloat(regions[0].getAttribute("x"), 10),
      y: parseFloat(regions[0].getAttribute("y"), 10),
      width: parseFloat(regions[0].getAttribute("w"), 10),
      height: parseFloat(regions[0].getAttribute("h"), 10),
      timeRange: timeRange,
    };
    const sx = regions[0].getAttribute("sx");
    const sy = regions[0].getAttribute("sy");
    if (sx) shape.sx = parseFloat(sx, 10);
    if (sy) shape.sy = parseFloat(sy, 10);
    return shape;
  }
  getAttributesFromBase(base) {
    const attributes = {};
    attributes.type = base.getAttribute("type");
    attributes.style = base.getAttribute("style");
    return attributes;
  }
  getTextFromBase(base) {
    const textElement = base.getElementsByTagName("TEXT")[0];
    if (textElement) return textElement.textContent;
  }
  getActionFromBase(base) {
    const actionElement = base.getElementsByTagName("action")[0];
    if (!actionElement) return null;
    const typeAttr = actionElement.getAttribute("type");
    const urlElement = actionElement.getElementsByTagName("url")[0];
    if (!urlElement) return null;
    const actionUrlTarget = urlElement.getAttribute("target");
    const href = urlElement.getAttribute("value");
    if (href.startsWith("https://www.youtube.com/")) {
      const url = new URL(href);
      const srcVid = url.searchParams.get("src_vid");
      const toVid = url.searchParams.get("v");
      return this.linkOrTimestamp(url, srcVid, toVid, actionUrlTarget);
    }
  }
  linkOrTimestamp(url, srcVid, toVid, actionUrlTarget) {
    if (srcVid && toVid && srcVid === toVid) {
      let seconds = 0;
      const hash = url.hash;
      if (hash && hash.startsWith("#t=")) {
        const timeString = url.hash.split("#t=")[1];
        seconds = this.timeStringToSeconds(timeString);
      }
      return { actionType: "time", actionSeconds: seconds };
    } else {
      return {
        actionType: "url",
        actionUrl: url.href,
        actionUrlTarget: actionUrlTarget,
      };
    }
  }
  getAppearanceFromBase(base) {
    const appearanceElement = base.getElementsByTagName("appearance")[0];
    const styles = this.constructor.defaultAppearanceAttributes;
    if (appearanceElement) {
      const bgOpacity = appearanceElement.getAttribute("bgAlpha");
      const bgColor = appearanceElement.getAttribute("bgColor");
      const fgColor = appearanceElement.getAttribute("fgColor");
      const textSize = appearanceElement.getAttribute("textSize");
      if (bgOpacity) styles.bgOpacity = parseFloat(bgOpacity, 10);
      if (bgColor) styles.bgColor = parseInt(bgColor, 10);
      if (fgColor) styles.fgColor = parseInt(fgColor, 10);
      if (textSize) styles.textSize = parseFloat(textSize, 10);
    }
    return styles;
  }
  extractRegionTime(regions) {
    let timeStart = regions[0].getAttribute("t");
    timeStart = this.hmsToSeconds(timeStart);
    let timeEnd = regions[regions.length - 1].getAttribute("t");
    timeEnd = this.hmsToSeconds(timeEnd);
    return { start: timeStart, end: timeEnd };
  }
  hmsToSeconds(hms) {
    let p = hms.split(":");
    let s = 0;
    let m = 1;
    while (p.length > 0) {
      s += m * parseFloat(p.pop(), 10);
      m *= 60;
    }
    return s;
  }
  timeStringToSeconds(time) {
    let seconds = 0;
    const h = time.split("h");
    const m = (h[1] || time).split("m");
    const s = (m[1] || time).split("s");
    if (h[0] && h.length === 2) seconds += parseInt(h[0], 10) * 60 * 60;
    if (m[0] && m.length === 2) seconds += parseInt(m[0], 10) * 60;
    if (s[0] && s.length === 2) seconds += parseInt(s[0], 10);
    return seconds;
  }
  getKeyByValue(obj, value) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === value) {
          return key;
        }
      }
    }
  }
}
class AnnotationRenderer {
  constructor(annotations, container, playerOptions, updateInterval = 1e3) {
    if (!annotations) throw new Error("Annotation objects must be provided");
    if (!container)
      throw new Error("An element to contain the annotations must be provided");
    if (playerOptions && playerOptions.getVideoTime && playerOptions.seekTo) {
      this.playerOptions = playerOptions;
    } else {
      console.info(
        "AnnotationRenderer is running without a player. The update method will need to be called manually."
      );
    }
    this.annotations = annotations;
    this.container = container;
    this.annotationsContainer = document.createElement("div");
    this.annotationsContainer.classList.add("__cxt-ar-annotations-container__");
    this.annotationsContainer.setAttribute("data-layer", "4");
    this.annotationsContainer.addEventListener("click", (e) => {
      this.annotationClickHandler(e);
    });
    this.container.prepend(this.annotationsContainer);
    this.createAnnotationElements();
    this.updateAllAnnotationSizes();
    window.addEventListener("DOMContentLoaded", (e) => {
      this.updateAllAnnotationSizes();
    });
    this.updateInterval = updateInterval;
    this.updateIntervalId = null;
  }
  changeAnnotationData(annotations) {
    this.stop();
    this.removeAnnotationElements();
    this.annotations = annotations;
    this.createAnnotationElements();
    this.start();
  }
  createAnnotationElements() {
    for (const annotation of this.annotations) {
      const el = document.createElement("div");
      el.classList.add("__cxt-ar-annotation__");
      annotation.__element = el;
      el.__annotation = annotation;
      const closeButton = this.createCloseElement();
      closeButton.addEventListener("click", (e) => {
        el.setAttribute("hidden", "");
        el.setAttribute("data-ar-closed", "");
        if (el.__annotation.__speechBubble) {
          const speechBubble = el.__annotation.__speechBubble;
          speechBubble.style.display = "none";
        }
      });
      el.append(closeButton);
      if (annotation.text) {
        const textNode = document.createElement("span");
        textNode.textContent = annotation.text;
        el.append(textNode);
        el.setAttribute("data-ar-has-text", "");
      }
      if (annotation.style === "speech") {
        const containerDimensions = this.container.getBoundingClientRect();
        const speechX = this.percentToPixels(
          containerDimensions.width,
          annotation.x
        );
        const speechY = this.percentToPixels(
          containerDimensions.height,
          annotation.y
        );
        const speechWidth = this.percentToPixels(
          containerDimensions.width,
          annotation.width
        );
        const speechHeight = this.percentToPixels(
          containerDimensions.height,
          annotation.height
        );
        const speechPointX = this.percentToPixels(
          containerDimensions.width,
          annotation.sx
        );
        const speechPointY = this.percentToPixels(
          containerDimensions.height,
          annotation.sy
        );
        const bubbleColor = this.getFinalAnnotationColor(annotation, false);
        const bubble = this.createSvgSpeechBubble(
          speechX,
          speechY,
          speechWidth,
          speechHeight,
          speechPointX,
          speechPointY,
          bubbleColor,
          annotation.__element
        );
        bubble.style.display = "none";
        bubble.style.overflow = "visible";
        el.style.pointerEvents = "none";
        bubble.__annotationEl = el;
        annotation.__speechBubble = bubble;
        const path = bubble.getElementsByTagName("path")[0];
        path.addEventListener("mouseover", () => {
          closeButton.style.display = "block";
          closeButton.style.cursor = "pointer";
          path.setAttribute(
            "fill",
            this.getFinalAnnotationColor(annotation, true)
          );
        });
        path.addEventListener("mouseout", (e) => {
          if (
            !e.relatedTarget.classList.contains("__cxt-ar-annotation-close__")
          ) {
            closeButton.style.display = "none";
            closeButton.style.cursor = "default";
            path.setAttribute(
              "fill",
              this.getFinalAnnotationColor(annotation, false)
            );
          }
        });
        closeButton.addEventListener("mouseleave", () => {
          closeButton.style.display = "none";
          path.style.cursor = "default";
          closeButton.style.cursor = "default";
          path.setAttribute(
            "fill",
            this.getFinalAnnotationColor(annotation, false)
          );
        });
        el.prepend(bubble);
      } else if (annotation.type === "highlight") {
        el.style.backgroundColor = "";
        el.style.border = `2.5px solid ${this.getFinalAnnotationColor(
          annotation,
          false
        )}`;
        if (annotation.actionType === "url") el.style.cursor = "pointer";
      } else if (annotation.style !== "title") {
        el.style.backgroundColor = this.getFinalAnnotationColor(annotation);
        el.addEventListener("mouseenter", () => {
          el.style.backgroundColor = this.getFinalAnnotationColor(
            annotation,
            true
          );
        });
        el.addEventListener("mouseleave", () => {
          el.style.backgroundColor = this.getFinalAnnotationColor(
            annotation,
            false
          );
        });
        if (annotation.actionType === "url") el.style.cursor = "pointer";
      }
      el.style.color = `#${this.decimalToHex(annotation.fgColor)}`;
      el.setAttribute("data-ar-type", annotation.type);
      el.setAttribute("hidden", "");
      this.annotationsContainer.append(el);
    }
  }
  createCloseElement() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.classList.add("__cxt-ar-annotation-close__");
    const path = document.createElementNS(svg.namespaceURI, "path");
    path.setAttribute("d", "M25 25 L 75 75 M 75 25 L 25 75");
    path.setAttribute("stroke", "#bbb");
    path.setAttribute("stroke-width", 10);
    path.setAttribute("x", 5);
    path.setAttribute("y", 5);
    const circle = document.createElementNS(svg.namespaceURI, "circle");
    circle.setAttribute("cx", 50);
    circle.setAttribute("cy", 50);
    circle.setAttribute("r", 50);
    svg.append(circle, path);
    return svg;
  }
  createSvgSpeechBubble(
    x,
    y,
    width,
    height,
    pointX,
    pointY,
    color = "white",
    element,
    svg
  ) {
    const horizontalBaseStartMultiplier = 0.17379070765180116;
    const horizontalBaseEndMultiplier = 0.14896346370154384;
    const verticalBaseStartMultiplier = 0.12;
    const verticalBaseEndMultiplier = 0.3;
    let path;
    if (!svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.classList.add("__cxt-ar-annotation-speech-bubble__");
      path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("fill", color);
      svg.append(path);
    } else {
      path = svg.children[0];
    }
    svg.style.position = "absolute";
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.left = "0";
    svg.style.top = "0";
    let positionStart;
    let baseStartX = 0;
    let baseStartY = 0;
    let baseEndX = 0;
    let baseEndY = 0;
    let pointFinalX = pointX;
    let pointFinalY = pointY;
    let commentRectPath;
    const pospad = 20;
    let textWidth = 0;
    let textHeight = 0;
    let textX = 0;
    let textY = 0;
    let textElement;
    let closeElement;
    if (element) {
      textElement = element.getElementsByTagName("span")[0];
      closeElement = element.getElementsByClassName(
        "__cxt-ar-annotation-close__"
      )[0];
    }
    if (pointX > x + width - width / 2 && pointY > y + height) {
      positionStart = "br";
      baseStartX = width - width * horizontalBaseStartMultiplier * 2;
      baseEndX = baseStartX + width * horizontalBaseEndMultiplier;
      baseStartY = height;
      baseEndY = height;
      pointFinalX = pointX - x;
      pointFinalY = pointY - y;
      element.style.height = pointY - y;
      commentRectPath = `L${width} ${height} L${width} 0 L0 0 L0 ${baseStartY} L${baseStartX} ${baseStartY}`;
      if (textElement) {
        textWidth = width;
        textHeight = height;
        textX = 0;
        textY = 0;
      }
    } else if (pointX < x + width - width / 2 && pointY > y + height) {
      positionStart = "bl";
      baseStartX = width * horizontalBaseStartMultiplier;
      baseEndX = baseStartX + width * horizontalBaseEndMultiplier;
      baseStartY = height;
      baseEndY = height;
      pointFinalX = pointX - x;
      pointFinalY = pointY - y;
      element.style.height = `${pointY - y}px`;
      commentRectPath = `L${width} ${height} L${width} 0 L0 0 L0 ${baseStartY} L${baseStartX} ${baseStartY}`;
      if (textElement) {
        textWidth = width;
        textHeight = height;
        textX = 0;
        textY = 0;
      }
    } else if (pointX > x + width - width / 2 && pointY < y - pospad) {
      positionStart = "tr";
      baseStartX = width - width * horizontalBaseStartMultiplier * 2;
      baseEndX = baseStartX + width * horizontalBaseEndMultiplier;
      const yOffset = y - pointY;
      baseStartY = yOffset;
      baseEndY = yOffset;
      element.style.top = y - yOffset + "px";
      element.style.height = height + yOffset + "px";
      pointFinalX = pointX - x;
      pointFinalY = 0;
      commentRectPath = `L${width} ${yOffset} L${width} ${
        height + yOffset
      } L0 ${height + yOffset} L0 ${yOffset} L${baseStartX} ${baseStartY}`;
      if (textElement) {
        textWidth = width;
        textHeight = height;
        textX = 0;
        textY = yOffset;
      }
    } else if (pointX < x + width - width / 2 && pointY < y) {
      positionStart = "tl";
      baseStartX = width * horizontalBaseStartMultiplier;
      baseEndX = baseStartX + width * horizontalBaseEndMultiplier;
      const yOffset = y - pointY;
      baseStartY = yOffset;
      baseEndY = yOffset;
      element.style.top = y - yOffset + "px";
      element.style.height = height + yOffset + "px";
      pointFinalX = pointX - x;
      pointFinalY = 0;
      commentRectPath = `L${width} ${yOffset} L${width} ${
        height + yOffset
      } L0 ${height + yOffset} L0 ${yOffset} L${baseStartX} ${baseStartY}`;
      if (textElement) {
        textWidth = width;
        textHeight = height;
        textX = 0;
        textY = yOffset;
      }
    } else if (
      pointX > x + width &&
      pointY > y - pospad &&
      pointY < y + height - pospad
    ) {
      positionStart = "r";
      const xOffset = pointX - (x + width);
      baseStartX = width;
      baseEndX = width;
      element.style.width = width + xOffset + "px";
      baseStartY = height * verticalBaseStartMultiplier;
      baseEndY = baseStartY + height * verticalBaseEndMultiplier;
      pointFinalX = width + xOffset;
      pointFinalY = pointY - y;
      commentRectPath = `L${baseStartX} ${height} L0 ${height} L0 0 L${baseStartX} 0 L${baseStartX} ${baseStartY}`;
      if (textElement) {
        textWidth = width;
        textHeight = height;
        textX = 0;
        textY = 0;
      }
    } else if (pointX < x && pointY > y && pointY < y + height) {
      positionStart = "l";
      const xOffset = x - pointX;
      baseStartX = xOffset;
      baseEndX = xOffset;
      element.style.left = x - xOffset + "px";
      element.style.width = width + xOffset + "px";
      baseStartY = height * verticalBaseStartMultiplier;
      baseEndY = baseStartY + height * verticalBaseEndMultiplier;
      pointFinalX = 0;
      pointFinalY = pointY - y;
      commentRectPath = `L${baseStartX} ${height} L${
        width + baseStartX
      } ${height} L${
        width + baseStartX
      } 0 L${baseStartX} 0 L${baseStartX} ${baseStartY}`;
      if (textElement) {
        textWidth = width;
        textHeight = height;
        textX = xOffset;
        textY = 0;
      }
    } else {
      return svg;
    }
    if (textElement) {
      textElement.style.left = textX + "px";
      textElement.style.top = textY + "px";
      textElement.style.width = textWidth + "px";
      textElement.style.height = textHeight + "px";
    }
    if (closeElement) {
      const closeSize = parseFloat(
        this.annotationsContainer.style.getPropertyValue(
          "--annotation-close-size"
        ),
        10
      );
      if (closeSize) {
        closeElement.style.left = textX + textWidth + closeSize / -1.8 + "px";
        closeElement.style.top = textY + closeSize / -1.8 + "px";
      }
    }
    const pathData = `M${baseStartX} ${baseStartY} L${pointFinalX} ${pointFinalY} L${baseEndX} ${baseEndY} ${commentRectPath}`;
    path.setAttribute("d", pathData);
    return svg;
  }
  getFinalAnnotationColor(annotation, hover = false) {
    const alphaHex = hover
      ? (230).toString(16)
      : Math.floor(annotation.bgOpacity * 255).toString(16);
    if (!isNaN(annotation.bgColor)) {
      const bgColorHex = this.decimalToHex(annotation.bgColor);
      const backgroundColor = `#${bgColorHex}${alphaHex}`;
      return backgroundColor;
    }
  }
  removeAnnotationElements() {
    for (const annotation of this.annotations) {
      annotation.__element.remove();
    }
  }
  update(videoTime) {
    for (const annotation of this.annotations) {
      const el = annotation.__element;
      if (el.hasAttribute("data-ar-closed")) continue;
      const start = annotation.timeStart;
      const end = annotation.timeEnd;
      if (el.hasAttribute("hidden") && videoTime >= start && videoTime < end) {
        el.removeAttribute("hidden");
        if (annotation.style === "speech" && annotation.__speechBubble) {
          annotation.__speechBubble.style.display = "block";
        }
      } else if (
        !el.hasAttribute("hidden") &&
        (videoTime < start || videoTime > end)
      ) {
        el.setAttribute("hidden", "");
        if (annotation.style === "speech" && annotation.__speechBubble) {
          annotation.__speechBubble.style.display = "none";
        }
      }
    }
  }
  start() {
    if (!this.playerOptions)
      throw new Error("playerOptions must be provided to use the start method");
    const videoTime = this.playerOptions.getVideoTime();
    if (!this.updateIntervalId) {
      this.update(videoTime);
      this.updateIntervalId = setInterval(() => {
        const videoTime = this.playerOptions.getVideoTime();
        this.update(videoTime);
        window.dispatchEvent(new CustomEvent("__ar_renderer_start"));
      }, this.updateInterval);
    }
  }
  stop() {
    if (!this.playerOptions)
      throw new Error("playerOptions must be provided to use the stop method");
    const videoTime = this.playerOptions.getVideoTime();
    if (this.updateIntervalId) {
      this.update(videoTime);
      clearInterval(this.updateIntervalId);
      this.updateIntervalId = null;
      window.dispatchEvent(new CustomEvent("__ar_renderer_stop"));
    }
  }
  updateAnnotationTextSize(annotation, containerHeight) {
    if (annotation.textSize) {
      const textSize = (annotation.textSize / 100) * containerHeight;
      annotation.__element.style.fontSize = `${textSize}px`;
    }
  }
  updateTextSize() {
    const containerHeight = this.container.getBoundingClientRect().height;
    for (const annotation of this.annotations) {
      this.updateAnnotationTextSize(annotation, containerHeight);
    }
  }
  updateCloseSize(containerHeight) {
    if (!containerHeight)
      containerHeight = this.container.getBoundingClientRect().height;
    const multiplier = 0.0423;
    this.annotationsContainer.style.setProperty(
      "--annotation-close-size",
      `${containerHeight * multiplier}px`
    );
  }
  updateAnnotationDimensions(annotations, videoWidth, videoHeight) {
    const playerWidth = this.container.getBoundingClientRect().width;
    const playerHeight = this.container.getBoundingClientRect().height;
    const widthDivider = playerWidth / videoWidth;
    const heightDivider = playerHeight / videoHeight;
    let scaledVideoWidth = playerWidth;
    let scaledVideoHeight = playerHeight;
    if (widthDivider % 1 !== 0 || heightDivider % 1 !== 0) {
      if (widthDivider > heightDivider) {
        scaledVideoWidth = (playerHeight / videoHeight) * videoWidth;
        scaledVideoHeight = playerHeight;
      } else if (heightDivider > widthDivider) {
        scaledVideoWidth = playerWidth;
        scaledVideoHeight = (playerWidth / videoWidth) * videoHeight;
      }
    }
    const verticalBlackBarWidth = (playerWidth - scaledVideoWidth) / 2;
    const horizontalBlackBarHeight = (playerHeight - scaledVideoHeight) / 2;
    const widthOffsetPercent = (verticalBlackBarWidth / playerWidth) * 100;
    const heightOffsetPercent = (horizontalBlackBarHeight / playerHeight) * 100;
    const widthMultiplier = scaledVideoWidth / playerWidth;
    const heightMultiplier = scaledVideoHeight / playerHeight;
    for (const annotation of annotations) {
      const el = annotation.__element;
      let ax = widthOffsetPercent + annotation.x * widthMultiplier;
      let ay = heightOffsetPercent + annotation.y * heightMultiplier;
      let aw = annotation.width * widthMultiplier;
      let ah = annotation.height * heightMultiplier;
      el.style.left = `${ax}%`;
      el.style.top = `${ay}%`;
      el.style.width = `${aw}%`;
      el.style.height = `${ah}%`;
      let horizontalPadding = scaledVideoWidth * 0.008;
      let verticalPadding = scaledVideoHeight * 0.008;
      if (annotation.style === "speech" && annotation.text) {
        const pel = annotation.__element.getElementsByTagName("span")[0];
        horizontalPadding *= 2;
        verticalPadding *= 2;
        pel.style.paddingLeft = horizontalPadding + "px";
        pel.style.paddingRight = horizontalPadding + "px";
        pel.style.paddingBottom = verticalPadding + "px";
        pel.style.paddingTop = verticalPadding + "px";
      } else if (annotation.style !== "speech") {
        el.style.paddingLeft = horizontalPadding + "px";
        el.style.paddingRight = horizontalPadding + "px";
        el.style.paddingBottom = verticalPadding + "px";
        el.style.paddingTop = verticalPadding + "px";
      }
      if (annotation.__speechBubble) {
        const asx = this.percentToPixels(playerWidth, ax);
        const asy = this.percentToPixels(playerHeight, ay);
        const asw = this.percentToPixels(playerWidth, aw);
        const ash = this.percentToPixels(playerHeight, ah);
        let sx = widthOffsetPercent + annotation.sx * widthMultiplier;
        let sy = heightOffsetPercent + annotation.sy * heightMultiplier;
        sx = this.percentToPixels(playerWidth, sx);
        sy = this.percentToPixels(playerHeight, sy);
        this.createSvgSpeechBubble(
          asx,
          asy,
          asw,
          ash,
          sx,
          sy,
          null,
          annotation.__element,
          annotation.__speechBubble
        );
      }
      this.updateAnnotationTextSize(annotation, scaledVideoHeight);
      this.updateCloseSize(scaledVideoHeight);
    }
  }
  updateAllAnnotationSizes() {
    if (
      this.playerOptions &&
      this.playerOptions.getOriginalVideoWidth &&
      this.playerOptions.getOriginalVideoHeight
    ) {
      const videoWidth = this.playerOptions.getOriginalVideoWidth();
      const videoHeight = this.playerOptions.getOriginalVideoHeight();
      this.updateAnnotationDimensions(
        this.annotations,
        videoWidth,
        videoHeight
      );
    } else {
      const playerWidth = this.container.getBoundingClientRect().width;
      const playerHeight = this.container.getBoundingClientRect().height;
      this.updateAnnotationDimensions(
        this.annotations,
        playerWidth,
        playerHeight
      );
    }
  }
  hideAll() {
    for (const annotation of this.annotations) {
      annotation.__element.setAttribute("hidden", "");
    }
  }
  annotationClickHandler(e) {
    let annotationElement = e.target;
    if (
      !annotationElement.matches(".__cxt-ar-annotation__") &&
      !annotationElement.closest(".__cxt-ar-annotation-close__")
    ) {
      annotationElement = annotationElement.closest(".__cxt-ar-annotation__");
      if (!annotationElement) return null;
    }
    let annotationData = annotationElement.__annotation;
    if (!annotationElement || !annotationData) return;
    if (annotationData.actionType === "time") {
      const seconds = annotationData.actionSeconds;
      if (this.playerOptions) {
        this.playerOptions.seekTo(seconds);
        const videoTime = this.playerOptions.getVideoTime();
        this.update(videoTime);
      }
      window.dispatchEvent(
        new CustomEvent("__ar_seek_to", { detail: { seconds: seconds } })
      );
    } else if (annotationData.actionType === "url") {
      const data = {
        url: annotationData.actionUrl,
        target: annotationData.actionUrlTarget || "current",
      };
      const timeHash = this.extractTimeHash(new URL(data.url));
      if (timeHash && timeHash.hasOwnProperty("seconds")) {
        data.seconds = timeHash.seconds;
      }
      window.dispatchEvent(
        new CustomEvent("__ar_annotation_click", { detail: data })
      );
    }
  }
  setUpdateInterval(ms) {
    this.updateInterval = ms;
    this.stop();
    this.start();
  }
  decimalToHex(dec) {
    let hex = dec.toString(16);
    hex = "000000".substr(0, 6 - hex.length) + hex;
    return hex;
  }
  extractTimeHash(url) {
    if (!url) throw new Error("A URL must be provided");
    const hash = url.hash;
    if (hash && hash.startsWith("#t=")) {
      const timeString = url.hash.split("#t=")[1];
      const seconds = this.timeStringToSeconds(timeString);
      return { seconds: seconds };
    } else {
      return false;
    }
  }
  timeStringToSeconds(time) {
    let seconds = 0;
    const h = time.split("h");
    const m = (h[1] || time).split("m");
    const s = (m[1] || time).split("s");
    if (h[0] && h.length === 2) seconds += parseInt(h[0], 10) * 60 * 60;
    if (m[0] && m.length === 2) seconds += parseInt(m[0], 10) * 60;
    if (s[0] && s.length === 2) seconds += parseInt(s[0], 10);
    return seconds;
  }
  percentToPixels(a, b) {
    return (a * b) / 100;
  }
}
function youtubeAnnotationsPlugin(options) {
  if (!options.annotationXml)
    throw new Error("Annotation data must be provided");
  if (!options.videoContainer)
    throw new Error(
      "A video container to overlay the data on must be provided"
    );
  const player = this;
  const xml = options.annotationXml;
  const parser = new AnnotationParser();
  const annotationElements = parser.getAnnotationsFromXml(xml);
  const annotations = parser.parseYoutubeAnnotationList(annotationElements);
  const videoContainer = options.videoContainer;
  const playerOptions = {
    getVideoTime() {
      return player.currentTime();
    },
    seekTo(seconds) {
      player.currentTime(seconds);
    },
    getOriginalVideoWidth() {
      return player.videoWidth();
    },
    getOriginalVideoHeight() {
      return player.videoHeight();
    },
  };
  raiseControls();
  const renderer = new AnnotationRenderer(
    annotations,
    videoContainer,
    playerOptions,
    options.updateInterval
  );
  setupEventListeners(player, renderer);
  renderer.start();
}
function setupEventListeners(player, renderer) {
  if (!player) throw new Error("A video player must be provided");
  player.on("playerresize", (e) => {
    renderer.updateAllAnnotationSizes(renderer.annotations);
  });
  player.one("loadedmetadata", (e) => {
    renderer.updateAllAnnotationSizes(renderer.annotations);
  });
  player.on("pause", (e) => {
    renderer.stop();
  });
  player.on("play", (e) => {
    renderer.start();
  });
  player.on("seeking", (e) => {
    renderer.update();
  });
  player.on("seeked", (e) => {
    renderer.update();
  });
}
function raiseControls() {
  const styles = document.createElement("style");
  styles.textContent = `\n\t.vjs-control-bar {\n\t\tz-index: 21;\n\t}\n\t`;
  document.body.append(styles);
}
!(function (e, r) {
  if ("function" == typeof define && define.amd) define(["video.js"], r);
  else if ("undefined" != typeof exports) r(require("video.js"));
  else {
    var t = { exports: {} };
    r(e.videojs), (e.videojsMarkers = t.exports);
  }
})(this, function (e) {
  "use strict";
  function r() {
    var e = new Date().getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (r) {
        var t = (e + 16 * Math.random()) % 16 | 0;
        return (
          (e = Math.floor(e / 16)), ("x" == r ? t : (3 & t) | 8).toString(16)
        );
      }
    );
  }
  function t(e) {
    var r,
      t = { top: 0, bottom: 0, left: 0, width: 0, height: 0, right: 0 };
    try {
      r = e.getBoundingClientRect();
    } catch (e) {
      r = t;
    }
    return r;
  }
  function i(e) {
    function i() {
      M.sort(function (e, r) {
        return j.markerTip.time(e) - j.markerTip.time(r);
      });
    }
    function u(e) {
      e.forEach(function (e) {
        (e.key = r()),
          S.el().querySelector(".vjs-progress-holder").appendChild(s(e)),
          (E[e.key] = e),
          M.push(e);
      }),
        i();
    }
    function c(e) {
      return (j.markerTip.time(e) / S.duration()) * 100;
    }
    function f(e, r) {
      (r.className = "vjs-marker " + (e.class || "")),
        Object.keys(j.markerStyle).forEach(function (e) {
          r.style[e] = j.markerStyle[e];
        });
      var i = e.time / S.duration();
      if (
        ((i < 0 || i > 1) && (r.style.display = "none"),
        (r.style.left = c(e) + "%"),
        e.duration)
      )
        (r.style.width = (e.duration / S.duration()) * 100 + "%"),
          (r.style.marginLeft = "0px");
      else {
        var n = t(r);
        r.style.marginLeft = n.width / 2 + "px";
      }
    }
    function s(e) {
      var r = n.default.createEl(
        "div",
        {},
        { "data-marker-key": e.key, "data-marker-time": j.markerTip.time(e) }
      );
      return (
        f(e, r),
        r.addEventListener("click", function (r) {
          var t = !1;
          if (
            ("function" == typeof j.onMarkerClick &&
              (t = !1 === j.onMarkerClick(e)),
            !t)
          ) {
            var i = this.getAttribute("data-marker-key");
            S.currentTime(j.markerTip.time(E[i]));
          }
        }),
        j.markerTip.display && v(r),
        r
      );
    }
    function d(e) {
      M.forEach(function (r) {
        var t = S.el().querySelector(
            ".vjs-marker[data-marker-key='" + r.key + "']"
          ),
          i = j.markerTip.time(r);
        (e || t.getAttribute("data-marker-time") !== i) &&
          (f(r, t), t.setAttribute("data-marker-time", i));
      }),
        i();
    }
    function m(e) {
      w && ((L = l), (w.style.visibility = "hidden")), (O = l);
      var r = [];
      e.forEach(function (e) {
        var t = M[e];
        if (t) {
          delete E[t.key], r.push(e);
          var i = S.el().querySelector(
            ".vjs-marker[data-marker-key='" + t.key + "']"
          );
          i && i.parentNode.removeChild(i);
        }
      }),
        r.reverse(),
        r.forEach(function (e) {
          M.splice(e, 1);
        }),
        i();
    }
    function v(e) {
      e.addEventListener("mouseover", function () {
        var r = E[e.getAttribute("data-marker-key")];
        if (A) {
          (A.querySelector(".vjs-tip-inner").innerText = j.markerTip.text(r)),
            (A.style.left = c(r) + "%");
          var i = t(A),
            n = t(e);
          (A.style.marginLeft =
            -parseFloat(i.width / 2) + parseFloat(n.width / 4) + "px"),
            (A.style.visibility = "visible");
        }
      }),
        e.addEventListener("mouseout", function () {
          A && (A.style.visibility = "hidden");
        });
    }
    function y() {
      (A = n.default.createEl("div", {
        className: "vjs-tip",
        innerHTML:
          "<div class='vjs-tip-arrow'></div><div class='vjs-tip-inner'></div>",
      })),
        S.el().querySelector(".vjs-progress-holder").appendChild(A);
    }
    function k() {
      if (j.breakOverlay.display && !(O < 0)) {
        var e = S.currentTime(),
          r = M[O],
          t = j.markerTip.time(r);
        e >= t && e <= t + j.breakOverlay.displayTime
          ? (L !== O &&
              ((L = O),
              w &&
                (w.querySelector(
                  ".vjs-break-overlay-text"
                ).innerHTML = j.breakOverlay.text(r))),
            w && (w.style.visibility = "visible"))
          : ((L = l), w && (w.style.visibility = "hidden"));
      }
    }
    function p() {
      (w = n.default.createEl("div", {
        className: "vjs-break-overlay",
        innerHTML: "<div class='vjs-break-overlay-text'></div>",
      })),
        Object.keys(j.breakOverlay.style).forEach(function (e) {
          w && (w.style[e] = j.breakOverlay.style[e]);
        }),
        S.el().appendChild(w),
        (L = l);
    }
    function h() {
      x(),
        k(),
        e.onTimeUpdateAfterMarkerUpdate && e.onTimeUpdateAfterMarkerUpdate();
    }
    function x() {
      if (M.length) {
        var r = function (e) {
            return e < M.length - 1 ? j.markerTip.time(M[e + 1]) : S.duration();
          },
          t = S.currentTime(),
          i = l;
        if (O !== l) {
          var n = r(O);
          if (t >= j.markerTip.time(M[O]) && t < n) return;
          if (O === M.length - 1 && t === S.duration()) return;
        }
        if (t < j.markerTip.time(M[0])) i = l;
        else
          for (var a = 0; a < M.length; a++)
            if (((n = r(a)), t >= j.markerTip.time(M[a]) && t < n)) {
              i = a;
              break;
            }
        i !== O &&
          (i !== l && e.onMarkerReached && e.onMarkerReached(M[i], i), (O = i));
      }
    }
    function b() {
      j.markerTip.display && y(),
        S.markers.removeAll(),
        u(j.markers),
        j.breakOverlay.display && p(),
        h(),
        S.on("timeupdate", h),
        S.off("loadedmetadata");
    }
    if (!n.default.mergeOptions) {
      var T = function (e) {
          return (
            !!e &&
            "object" === (void 0 === e ? "undefined" : a(e)) &&
            "[object Object]" === toString.call(e) &&
            e.constructor === Object
          );
        },
        g = function e(r, t) {
          var i = {};
          return (
            [r, t].forEach(function (r) {
              r &&
                Object.keys(r).forEach(function (t) {
                  var n = r[t];
                  T(n)
                    ? (T(i[t]) || (i[t] = {}), (i[t] = e(i[t], n)))
                    : (i[t] = n);
                });
            }),
            i
          );
        };
      n.default.mergeOptions = g;
    }
    n.default.createEl ||
      (n.default.createEl = function (e, r, t) {
        var i = n.default.Player.prototype.createEl(e, r);
        return (
          t &&
            Object.keys(t).forEach(function (e) {
              i.setAttribute(e, t[e]);
            }),
          i
        );
      });
    var j = n.default.mergeOptions(o, e),
      E = {},
      M = [],
      O = l,
      S = this,
      A = null,
      w = null,
      L = l;
    S.on("loadedmetadata", function () {
      b();
    }),
      (S.markers = {
        getMarkers: function () {
          return M;
        },
        next: function () {
          for (var e = S.currentTime(), r = 0; r < M.length; r++) {
            var t = j.markerTip.time(M[r]);
            if (t > e) {
              S.currentTime(t);
              break;
            }
          }
        },
        prev: function () {
          for (var e = S.currentTime(), r = M.length - 1; r >= 0; r--) {
            var t = j.markerTip.time(M[r]);
            if (t + 0.5 < e) return void S.currentTime(t);
          }
        },
        add: function (e) {
          u(e);
        },
        remove: function (e) {
          m(e);
        },
        removeAll: function () {
          for (var e = [], r = 0; r < M.length; r++) e.push(r);
          m(e);
        },
        updateTime: function (e) {
          d(e);
        },
        reset: function (e) {
          S.markers.removeAll(), u(e);
        },
        destroy: function () {
          S.markers.removeAll(),
            w && w.remove(),
            A && A.remove(),
            S.off("timeupdate", k),
            delete S.markers;
        },
      });
  }
  var n = (function (e) {
      return e && e.__esModule ? e : { default: e };
    })(e),
    a =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          },
    o = {
      markerStyle: {
        width: "7px",
        "border-radius": "30%",
        "background-color": "red",
      },
      markerTip: {
        display: !0,
        text: function (e) {
          return "Break: " + e.text;
        },
        time: function (e) {
          return e.time;
        },
      },
      breakOverlay: {
        display: !1,
        displayTime: 3,
        text: function (e) {
          return "Break overlay: " + e.overlayText;
        },
        style: {
          width: "100%",
          height: "20%",
          "background-color": "rgba(0,0,0,0.7)",
          color: "white",
          "font-size": "17px",
        },
      },
      onMarkerClick: function (e) {},
      onMarkerReached: function (e, r) {},
      markers: [],
    },
    l = -1;
  n.default.plugin("markers", i);
});

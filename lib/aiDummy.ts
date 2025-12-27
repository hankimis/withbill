import type { AiReport } from "@/lib/domain";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function hashToSeed(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateAiReport(inputKey: string): AiReport {
  const rng = mulberry32(hashToSeed(inputKey));

  const timing = clamp(Math.round(55 + rng() * 40), 0, 100);
  const accuracy = clamp(Math.round(50 + rng() * 45), 0, 100);
  const angle = clamp(Math.round(45 + rng() * 50), 0, 100);
  const energy = clamp(Math.round(50 + rng() * 45), 0, 100);

  const issuePool = [
    {
      title: "타이밍이 살짝 앞/뒤로 흔들립니다",
      detail:
        "특히 킥/스텝 진입에서 반 박자 정도 밀리는 구간이 보여요. '기준 박'을 먼저 고정하고, 움직임을 그 위에 얹는 연습이 필요합니다."
    },
    {
      title: "동작 정확도가 구간별로 달라집니다",
      detail:
        "후반으로 갈수록 팔/손끝 디테일이 흐려지는 경향이 있습니다. 루틴을 8카운트 단위로 끊어서 동일 퀄리티를 유지하세요."
    },
    {
      title: "각도/라인이 카메라 기준으로 손해를 봅니다",
      detail:
        "상체가 정면을 너무 자주 향해서 동작이 평면적으로 보여요. 10~20도만 열어도 라인이 살아납니다."
    },
    {
      title: "에너지 분배가 초반 과다-후반 부족 패턴입니다",
      detail:
        "초반에 힘을 많이 쓰고 후반에 '떨어지는' 느낌이 있습니다. 1~8, 9~16, 17~24로 에너지 목표를 나눠보세요."
    },
    {
      title: "무게중심 이동이 짧아서 동선이 작아 보입니다",
      detail:
        "발로만 움직이고 골반/몸통이 따라오지 않으면 동작이 작아 보입니다. '중심 이동 → 고정'을 먼저 훈련하세요."
    }
  ];

  // 3개 이슈 고정 출력(시드 기반 셔플)
  const shuffled = issuePool
    .map((x) => ({ x, k: rng() }))
    .sort((a, b) => a.k - b.k)
    .map((v) => v.x);

  const issues = shuffled.slice(0, 3);

  const summary =
    "댄스 병원(진단/처방) 관점에서 보면, '타이밍-정확도-각도-에너지' 중 2~3개 축에서 동시에 개선 여지가 있습니다. 지금 단계에서는 큰 동작을 늘리기보다, 기준 박/각도를 먼저 고정하는 처방이 효율적입니다.";

  const nextDrills = [
    "8카운트 루프(메트로놈)로 타이밍 고정",
    "거울/카메라로 각도 10~20도 열기 체크",
    "후반 디테일 유지: 팔끝-손끝-시선 3점 체크"
  ];

  return {
    scores: { timing, accuracy, angle, energy },
    issues,
    summary,
    nextDrills
  };
}



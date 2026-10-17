import { useEffect, useState } from "react";
import { GITHUB_LINK } from "../Utils/const";
import { portfolioApi } from "../services/portfolioApi";

export default function LiveProof() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    portfolioApi.proof(controller.signal).then(setData).catch(() => {});
    return () => controller.abort();
  }, []);
  return <section className="surface-card live-proof"><div><p className="eyebrow">Live engineering proof</p><h2>Public work and package activity</h2><p>{data ? `GitHub and PyPI metadata cached ${new Date(data.cached_at).toLocaleDateString()}.` : "Live metadata loads when portfolio API is available."}</p></div><div className="proof-grid">{data?.github?.slice(0, 3).map(repo => <a key={repo.name} href={repo.url} target="_blank" rel="noreferrer"><strong>{repo.name}</strong><span>{repo.stars} stars · updated {new Date(repo.updated_at).toLocaleDateString()}</span></a>)}{data?.pypi && <a href="https://pypi.org/project/glycanbench/" target="_blank" rel="noreferrer"><strong>glycanbench {data.pypi.version}</strong><span>Latest PyPI release</span></a>}{!data && <a href={GITHUB_LINK} target="_blank" rel="noreferrer"><strong>View public repositories</strong><span>GitHub profile ↗</span></a>}</div></section>;
}

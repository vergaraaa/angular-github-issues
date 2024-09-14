import { sleep } from '@helpers/sleep';
import { GithubLabel } from '../interfaces/github-label.interface';

export const getLabels = async (): Promise<GithubLabel[]> => {
  await sleep(1500);

  try {
    const resp = await fetch(
      `https://api.github.com/repos/angular/angular/labels`
    );
    if (!resp.ok) throw "Cant't load labels";

    const labels: GithubLabel[] = await resp.json();

    console.log(labels);
    return labels;
  } catch (error) {
    throw "Cant't load labels";
  }
};

"use client";

import ArrowSvg from "../svg/ArrowSvg";
import { components, templates } from "./constants";

export default function OnchainKitLinks() {
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <div className="flex flex-col md:flex-row justify-between mt-4">
          <div className="md:w-1/2 mb-4 md:mb-0 flex flex-col items-center">
            <p className="font-semibold mb-2 text-center">Explore components</p>
            <ul className="list-disc pl-5 space-y-2 inline-block text-left">
              {components.map((component, index) => (
                <li key={index}>
                  <a
                    href={component.url}
                    className="hover:underline inline-flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {component.name}
                    <ArrowSvg />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 flex flex-col items-center">
            <p className="font-semibold mb-2 text-center">Explore templates</p>
            <ul className="list-disc pl-5 space-y-2 inline-block text-left">
              {templates.map((template, index) => (
                <li key={index}>
                  <a
                    href={template.url}
                    className="hover:underline inline-flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {template.name}
                    <ArrowSvg />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

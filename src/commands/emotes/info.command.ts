/*
  Remoji - Discord emoji manager bot
  Copyright (C) 2021 Shino <shinotheshino@gmail.com>.

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published
  by the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { Command } from "../../core/base/Command";
import { CommandContext } from "../../core/base/CommandContext";
import { EmbedUtil } from "../../core/utils/EmbedUtil";
import environment from "../../environment";

/**
 * `/info` command - Get info about Remoji.
 */
export class InfoCommand extends Command<true> {
  constructor() {
    super(
      {
        name: "info",
        description: "Get info about Remoji",
      },
      {
        guildOnly: true,
      },
    );
  }

  /**
   * Run the command.
   *
   * @param ctx - The context for the command.
   */
  async run(ctx: CommandContext<true>): Promise<void> {
    const bot = ctx.bot;

    const infoEmbed = EmbedUtil.info(ctx.s, ctx.s.info_remoji_description)
      .setThumbnail(bot.client.user?.displayAvatarURL() ?? "") // TODO: Fix this mess
      .addField(ctx.s.info_remoji_server_field, ctx.s.info_remoji_server_invite(environment.SUPPORT_INVITE))
      .addField(
        ctx.s.info_remoji_bot_field,
        ctx.s.info_remoji_bot_invite(environment.DISCORD_APPLICATION_ID, bot.constants.requiredPermissions.toString()),
      )
      .addField(ctx.s.info_remoji_vote_field, ctx.s.info_remoji_vote_value(environment.TOPGG_VOTE_URL))
      .addField(
        ctx.s.info_remoji_created,
        "[GitHub](https://github.com/shinotheshino)  |  [Patreon](https://patreon.com/shinotheshino)  |  [Twitch](https://twitch.tv/shinotheshino)",
      )
      .setFooter(ctx.s.info_remoji_version(bot.constants.version, bot.constants.git.branch, bot.constants.git.commit));
    await ctx.interaction.reply({ embeds: [infoEmbed] });
  }
}
